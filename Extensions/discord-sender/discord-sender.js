(function DiscordSend() {
    // Initialize the extension
    function init() {
        // Check for required Spicetify components
        if (!Spicetify?.CosmosAsync || !Spicetify?.ContextMenu || !Spicetify?.URI || !Spicetify?.React) {
            setTimeout(init, 500); // Retry initialization
            return;
        }

        // Load saved settings or use defaults
        let config = {
            token: localStorage.getItem('DISCORD_USER_TOKEN') || '',
            channel: localStorage.getItem('DISCORD_CHANNEL_ID') || '',
            command: localStorage.getItem('DISCORD_COMMAND_PREFIX') || 'm!play'
        };

        // ========================
        // SETTINGS MODAL COMPONENT
        // ========================
        function showSettingsModal() {
            const { React } = Spicetify;

            class SettingsModal extends React.Component {
                constructor(props) {
                    super(props);
                    this.state = {
                        token: config.token,
                        channel: config.channel,
                        command: config.command
                    };
                }

                saveSettings = () => {
                    localStorage.setItem('DISCORD_USER_TOKEN', this.state.token);
                    localStorage.setItem('DISCORD_CHANNEL_ID', this.state.channel);
                    localStorage.setItem('DISCORD_COMMAND_PREFIX', this.state.command);
                    config = { ...this.state };
                    Spicetify.showNotification('Settings saved!');
                    Spicetify.PopupModal.hide();
                };

                render() {
                    return React.createElement(
                        'div',
                        { className: 'main-settings-container' },
                        React.createElement('h2', null, 'Discord Settings'),
                        React.createElement('div', { className: 'input-wrapper' },
                            React.createElement('label', null, 'Bot Token:'),
                            React.createElement('input', {
                                type: 'password',
                                value: this.state.token,
                                onChange: e => this.setState({ token: e.target.value }),
                                style: { width: 'calc(100% - 10px)', padding: '8px', border: '1px solid var(--spice-border)', borderRadius: '4px', background: 'var(--spice-card)', color: 'var(--spice-text)' }
                            })
                        ),
                        React.createElement('div', { className: 'input-wrapper' },
                            React.createElement('label', null, 'Channel ID:'),
                            React.createElement('input', {
                                type: 'text',
                                value: this.state.channel,
                                onChange: e => this.setState({ channel: e.target.value }),
                                style: { width: 'calc(100% - 10px)', padding: '8px', border: '1px solid var(--spice-border)', borderRadius: '4px', background: 'var(--spice-card)', color: 'var(--spice-text)' }
                            })
                        ),
                        React.createElement('div', { className: 'input-wrapper' },
                            React.createElement('label', null, 'Command Prefix:'),
                            React.createElement('input', {
                                type: 'text',
                                value: this.state.command,
                                onChange: e => this.setState({ command: e.target.value }),
                                style: { width: 'calc(100% - 10px)', padding: '8px', border: '1px solid var(--spice-border)', borderRadius: '4px', background: 'var(--spice-card)', color: 'var(--spice-text)' }
                            })
                        ),
                        React.createElement('div', { className: 'button-container' },
                            React.createElement('button', {
                                style: { padding: '10px 20px', background: 'var(--spice-button, #1db954)', color: '#fff', border: 'none', borderRadius: '500px', fontSize: '1em', cursor: 'pointer', marginRight: '10px' },
                                onClick: this.saveSettings,
                                disabled: !this.state.token || !this.state.channel
                            }, 'Save'),
                            React.createElement('button', {
                                style: { padding: '10px 20px', background: 'var(--spice-card)', color: 'var(--spice-text)', border: '1px solid var(--spice-border)', borderRadius: '500px', fontSize: '1em', cursor: 'pointer' },
                                onClick: () => Spicetify.PopupModal.hide()
                            }, 'Cancel')
                        )
                    );
                }
            }

            Spicetify.PopupModal.display({
                title: 'Discord Configuration',
                content: React.createElement(SettingsModal)
            });
        }

        // ========================
        // SETTINGS BUTTON WITH ICON
        // ========================
        function createSettingsButton() {
            const iconSvg = '<svg viewBox="0 0 24 24" height="42" width="42" xmlns="http://www.w3.org/2000/svg", style="fill:gray;"><path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"/></svg>';

            new Spicetify.Topbar.Button(
                'Discord Settings',
                iconSvg,
                showSettingsModal
            ).register();
        }

        // ========================
        // DISCORD SEND FUNCTION
        // ========================
        async function sendToDiscord(content) {
            if (!config.token || !config.channel) {
                Spicetify.showNotification('Configure Discord settings first!', true);
                return false;
            }
        
            try {
            const response = await fetch(
            `https://discord.com/api/v9/channels/${config.channel}/messages`,
            {
                method: "POST",
                headers: {
                    "Authorization": config.token,
                    "Content-Type": "application/json",
                    "Origin": "https://discord.com"
                },
                body: JSON.stringify({ content: content })
                });
        
                if (response.status >= 400) {
                    throw new Error(`Discord API error: ${response.status} - ${response.statusText}`);
                }
        
                console.log('Response:', response);
                return true;
            } catch (error) {
                console.error('Discord send error:', error);
                Spicetify.showNotification(`Failed to send: ${error.message}`, true);
                return false;
            }
        }
        
        
        
        
        // ========================
        // CONTEXT MENU ITEMS
        // ========================
        function isTrackURI(uri) {
            try {
                return Spicetify.URI.fromString(uri).type === Spicetify.URI.Type.TRACK;
            } catch {
                return false;
            }
        }

        function isPlaylistURI(uri) {
            try {
                const parsed = Spicetify.URI.fromString(uri);
                return parsed.type === Spicetify.URI.Type.PLAYLIST ||
                    parsed.type === Spicetify.URI.Type.PLAYLIST_V2;
            } catch {
                return false;
            }
        }

        // Playlist context menu
        new Spicetify.ContextMenu.Item(
            "Send Playlist to Discord",
            async (uris) => {
                const parsed = Spicetify.URI.fromString(uris[0]);
                const playlistLink = `https://open.spotify.com/playlist/${parsed.id}`;
                const success = await sendToDiscord(`${config.command} ${playlistLink}`);
                Spicetify.showNotification(
                    success ? "Playlist sent!" : "Failed to send playlist",
                    !success
                );
            },
            uris => uris.length === 1 && isPlaylistURI(uris[0]),
            'discord-playlist',
            '<svg viewBox="0 0 24 24" height="16" width="16"><path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"/></svg>'
        ).register();

        // Track context menu
        new Spicetify.ContextMenu.Item(
            "Send to Discord",
            async (uris) => {
                const links = uris.map(uri => {
                    const parsed = Spicetify.URI.fromString(uri);
                    return `https://open.spotify.com/track/${parsed.id}`;
                });

                const chunkSize = 10;
                let successCount = 0;

                for (let i = 0; i < links.length; i += chunkSize) {
                    const chunk = links.slice(i, i + chunkSize);
                    const success = await sendToDiscord(`${config.command} ${chunk.join(" ")}`);
                    if (success) successCount++;
                    await new Promise(r => setTimeout(r, 1000)); // Delay between chunks
                }

                Spicetify.showNotification(
                    successCount === links.length ? "All tracks sent!" :
                        `Sent ${successCount}/${Math.ceil(links.length / chunkSize)} chunks`,
                    successCount === 0
                );
            },
            uris => uris.length > 0 && uris.every(isTrackURI),
            'discord',
            '<svg viewBox="0 0 24 24" height="16" width="16"><path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"/></svg>'
        ).register();

        // ========================
        // INITIALIZATION
        // ========================
        createSettingsButton();
        console.log("DiscordSend: Fully functional!");
    }

    init();
})();