import WebTorrent from "webtorrent";
import { TorrentInfo } from "./types.js";

/**
 * Create a WebTorrent client instance
 */
export function createWebTorrentClient(): WebTorrent.Instance {
  return new WebTorrent();
}

/**
 * Extract torrent info from WebTorrent instance
 */
export function extractTorrentInfo(torrent: WebTorrent.Torrent): TorrentInfo {
  return {
    infoHash: torrent.infoHash,
    magnetUri: torrent.magnetURI,
    files: torrent.files.map((file) => ({
      name: file.name,
      size: file.length,
      type: file.name.split(".").pop() || "",
    })),
  };
}
