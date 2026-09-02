/**
 * Discord Integration Foundation Service
 * 
 * Provides abstraction for Discord invite links and integration status.
 * Ready for future extension (e.g., fetching group-specific bot links, role syncing).
 */

export const discordService = {
  /**
   * Get the global Discord community invite URL configured via environment variables.
   * Do NOT hardcode invite URLs to prevent exposing them in source control.
   */
  getGlobalDiscordInvite(): string | undefined {
    // Expected to be set in Vercel or .env, e.g. "https://discord.gg/yourcode"
    return process.env.NEXT_PUBLIC_DISCORD_INVITE_URL;
  },

  /**
   * Get the effective Discord invite for a specific group.
   * If the group has a custom invite (set by owner), use that.
   * Otherwise, fall back to the global community invite (if any).
   */
  getGroupDiscordInvite(groupDiscordUrl?: string): string | undefined {
    if (groupDiscordUrl && groupDiscordUrl.trim() !== '') {
      return groupDiscordUrl;
    }
    return this.getGlobalDiscordInvite();
  }
};
