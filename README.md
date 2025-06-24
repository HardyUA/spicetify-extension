# Spicetify Extensions: Discord Sender & SimFinder

A collection of Spicetify extensions to enhance your Spotify experience by integrating with Discord and finding similar songs.

## Features

### Discord Sender

*   Send Spotify track and playlist links to a Discord channel.
*   Configurable bot token, channel ID, and command prefix.
*   Context menu item for tracks and playlists.
*   Settings button in Spicetify's top bar.

### SimFinder

*   Find similar songs based on various audio features (danceability, energy, valence, tempo, popularity, genres, and key).
*   Create Spotify playlists from the found similar songs.
*   Top bar button for manual input of search parameters.
*   Context menu items for tracks that auto-populate search parameters based on the selected track.

## Installation

1.  **Copy Extension Files:**
    Place `discord-sender.js`, `simfinder-button.js`, and `manifest.json` into your Spicetify `Extensions` folder (typically `~/.config/spicetify/Extensions` on Linux/macOS or `%userprofile%/.spicetify/Extensions` on Windows).

2.  **Apply Spicetify:**
    Open your terminal and run:
    ```bash
spicetify config extensions discord-sender.js|simfinder-button.js
spicetify apply
    ```

## Usage

### Discord Sender

*   **Settings:** Click the Discord icon (gray Discord logo) in Spotify's top bar to open the settings modal. Here you can enter your Discord bot token, channel ID, and desired command prefix (e.g., `m!play`).
*   **Sending Tracks/Playlists:** Right-click on any track or playlist in Spotify. In the context menu, select "Send to Discord" (for tracks) or "Send Playlist to Discord" (for playlists).

### SimFinder

*   **Search via Top Bar Button:** Click the "Find Similar Songs" button (circle with a dot icon) in Spotify's top bar. A modal will open where you can manually input parameters to find similar songs.
*   **Find Similar Songs via Context Menu:** Right-click on a track. In the context menu, select "Find Similar Songs (SimFinder)". The modal will be pre-filled with the audio features of the selected track.
*   **Find by Key via Context Menu:** Right-click on a track. In the context menu, select "Find by Key (SimFinder)". The modal will be pre-filled with the audio features of the selected track, including the key.

## Discord Sender Configuration

The Discord Sender extension uses `localStorage` to save your settings. You can configure the following parameters in the settings modal:

*   **Bot Token:** Your Discord bot token (requires `Bot` prefix in the `Authorization` header).
*   **Channel ID:** The ID of the Discord text channel where links will be sent.
*   **Command Prefix:** The command that will be used before the Spotify link when sending to Discord (defaults to `m!play`).
