/* ============================================================================
 *  INVITATION CONFIG  —  edit ONLY this file to change the invitation
 * ========================================================================== */

export const invitation = {
  meta: {
    pageTitle: 'Anshif & Jishna — Wedding Invitation',
    description: 'Request the pleasure of your company at our Nikkah.',
  },

  /* --- the couple -------------------------------------------------------
   * `order` decides who is shown first. Swap to ['groom', 'bride'] any time.
   * -------------------------------------------------------------------- */
  couple: {
    order: ['groom', 'bride'],
    bride: {
      name: 'Jishna Siddique Ali',
      shortName: 'Jishna',
      parents: 'D/o Mr. Siddique Ali & Mrs. Seenath Siddique',
      house: 'Manjeri',
    },
    groom: {
      name: 'Anshif Ummer',
      shortName: 'Anshif',
      parents: 'S/o Mr. Ummer Emaden & Mrs. Naslath Ummer',
      house: 'Pullengode, Kalikavu',
    },
  },

  words: {
    bismillah: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ',
    eyebrow: 'Together with their families',
    heroSub: 'Request the pleasure of your company',
    inviteLabel: 'On the occasion of the marriage of',
    connector: '&',
    openCta: 'Open Invitation',
    countdownCaption: 'Every moment brings us closer',
    unionArabic: 'وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
    unionLine: 'And He placed between you affection and mercy',
    unionRef: 'Sūrah Ar-Rūm · 30:21',
    duaArabic: 'بَارَكَ اللهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
    duaTranslit:
      'May Allah bless you both, and unite you together in goodness.',
    closing:
      'Your presence and prayers on this blessed day would mean the world to us. Jazakumullahu Khairan.',
    signature: 'Anshif & Jishna',
  },

  event: {
    title: 'Nikkah',
    dateTime: '2026-09-11T16:00:00',   // drives the live countdown
    weekday: 'Friday',
    dayNumber: '11',
    monthLabel: 'September',
    yearLabel: '2026',
    timeLabel: '4:00 PM',
  },

  venue: {
    name: 'Keyath Garden',
    address: 'Mariyad, Manjeri',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Keyath+Garden+Mariyad+Manjeri',
  },

  rsvp: {
    enabled: true,
    prompt: 'Will you join us?',
    hint: 'Tap to respond',
    yesLabel: 'Yes, إن شاء الله',
    noLabel: "Unfortunately, I can't make it",
    yesTitle: 'We Can’t Wait!',
    yesSub: 'Alhamdulillah — thank you for being part of our special day.',
    noTitle: 'We Will Miss You',
    noSub:
      'We completely understand. You will be missed — please keep us in your prayers.',
    endpoint: '', // optional POST endpoint to collect responses
  },

  /* --- the cover artwork ------------------------------------------------
   * Files live in /public. Swap them for any other illustration.
   * -------------------------------------------------------------------- */
  art: {
    hero: '/hero.jpg',
    heroWebp: '/hero.webp',
    alt: 'Watercolour illustration of a bride and groom with lanterns and a mosque skyline',
    // how the artwork is framed at each size (CSS object-position)
    focusWide: '22% 50%',
    focusNarrow: '26% 60%',

    /* The two images that meet in the middle when the guest scrolls past the
     * invitation. Use cut-out PNGs with a transparent background — a bride's
     * hand reaching in from the left, a groom's from the right, each roughly
     * 1200px wide. Drop them in /public and point here. Leave both empty and
     * two interlocking gold bands are shown instead. */
    handLeft: '',
    handRight: '',
  },

  music: {
    enabled: true,
    src: '/music.mp3',   // swap for your own .mp3 in /public
    volume: 0.45,
    fadeInMs: 2600,
  },
}

export default invitation
