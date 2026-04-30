import { CueBoxEvent } from '@/app/types/cuebox.types'

export const mockCueBoxEvents: CueBoxEvent[] = [
  {
    id: 'evt_born_usa',
    name: 'Born in the U.S.A.',
    status: 'ON_SALE',
    isVisibleOnline: true,
    firstInstanceDatetime: '2025-11-14T15:00:00Z',
    lastInstanceDatetime: '2025-11-16T19:30:00Z',
    publicTicketsUrl: 'https://your-org.app.getcuebox.com/o/ABCD1234/shows/evt_born_usa',
    publicImageUrl:
      'https://firebasestorage.googleapis.com/v0/b/the-pops-orchestra.firebasestorage.app/o/Pops%20Born%20In%20The%20USA.jpg?alt=media&token=c1d459fe-4a11-4b64-8e1e-a49527535187',
    tags: ['rock', 'american'],
    venues: [
      {
        name: 'Riverview Performing Arts Center',
        address: { line1: '', line2: '', city: 'Bradenton', region: 'FL', postal_code: '', country_code: 'US' }
      },
      {
        name: 'Neel Performing Arts Center',
        address: { line1: '', line2: '', city: 'Bradenton', region: 'FL', postal_code: '', country_code: 'US' }
      }
    ],
    subtitle: 'Music of Bruce Springsteen',
    description:
      'This season\'s patriotic celebration comes alive as "The Boss" arrives on the Cultural Coast. Born in the U.S.A. features powerhouse vocalist Alex Shillo performing the music of Bruce Springsteen, backed by the full Pops Orchestra.',
    type: 'SEASON',
    cardDate: 'Nov 14 – 16'
  },
  {
    id: 'evt_ring_holidays',
    name: 'Ring in the Holidays',
    status: 'ON_SALE',
    isVisibleOnline: true,
    firstInstanceDatetime: '2025-12-13T15:00:00Z',
    lastInstanceDatetime: '2025-12-14T19:30:00Z',
    publicTicketsUrl: 'https://your-org.app.getcuebox.com/o/ABCD1234/shows/evt_ring_holidays',
    publicImageUrl:
      'https://firebasestorage.googleapis.com/v0/b/the-pops-orchestra.firebasestorage.app/o/Pops%20Ring%20In%20the%20Holidays.jpg?alt=media&token=f5126d3e-eca4-4ab3-b2d9-45f0e9f20e5a',
    tags: ['holiday', 'family'],
    venues: [
      {
        name: 'Riverview Performing Arts Center',
        address: { line1: '', line2: '', city: 'Bradenton', region: 'FL', postal_code: '', country_code: 'US' }
      },
      {
        name: 'Sarasota Opera House',
        address: { line1: '', line2: '', city: 'Sarasota', region: 'FL', postal_code: '', country_code: 'US' }
      }
    ],
    subtitle: 'Ring Sarasota Handbell Choir',
    description:
      "The holiday season shines brighter as Ring Sarasota, the region's premier professional handbell choir, joins The Pops Orchestra for a magical celebration.",
    type: 'SEASON',
    cardDate: 'Dec 13 – 14'
  },
  {
    id: 'evt_cheek_to_cheek',
    name: 'Cheek to Cheek',
    status: 'ON_SALE',
    isVisibleOnline: true,
    firstInstanceDatetime: '2026-02-13T15:00:00Z',
    lastInstanceDatetime: '2026-02-15T19:30:00Z',
    publicTicketsUrl: 'https://your-org.app.getcuebox.com/o/ABCD1234/shows/evt_cheek_to_cheek',
    publicImageUrl:
      'https://firebasestorage.googleapis.com/v0/b/the-pops-orchestra.firebasestorage.app/o/Pops%20Cheek%20to%20Cheek.jpg?alt=media&token=39c7bc17-6770-40d3-b7c0-b9eeaf315f7e',
    tags: ['broadway', 'romance'],
    venues: [
      {
        name: 'Neel Performing Arts Center',
        address: { line1: '', line2: '', city: 'Bradenton', region: 'FL', postal_code: '', country_code: 'US' }
      },
      {
        name: 'Riverview Performing Arts Center',
        address: { line1: '', line2: '', city: 'Bradenton', region: 'FL', postal_code: '', country_code: 'US' }
      }
    ],
    subtitle: 'Tiffany Haas and Michael McCorry Rose',
    description:
      'The Pops Orchestra welcomes back Broadway star Tiffany Haas, joined by collaborator Michael McCorry Rose, for Cheek to Cheek.',
    type: 'SEASON',
    cardDate: 'Feb 13 – 15'
  },
  {
    id: 'evt_80s_ladies',
    name: "'80s Ladies",
    status: 'ON_SALE',
    isVisibleOnline: true,
    firstInstanceDatetime: '2026-03-13T15:00:00Z',
    lastInstanceDatetime: '2026-03-15T19:30:00Z',
    publicTicketsUrl: 'https://your-org.app.getcuebox.com/o/ABCD1234/shows/evt_80s_ladies',
    publicImageUrl:
      'https://firebasestorage.googleapis.com/v0/b/the-pops-orchestra.firebasestorage.app/o/Pops%2080s%20Ladies.jpg?alt=media&token=aa75acee-eb3c-4b0e-8a43-ca4013d8cd8e',
    tags: ['pop', '80s'],
    venues: [
      {
        name: 'Neel Performing Arts Center',
        address: { line1: '', line2: '', city: 'Bradenton', region: 'FL', postal_code: '', country_code: 'US' }
      },
      {
        name: 'Riverview Performing Arts Center',
        address: { line1: '', line2: '', city: 'Bradenton', region: 'FL', postal_code: '', country_code: 'US' }
      }
    ],
    subtitle: 'Featuring Jazzmin Carson and Friends',
    description:
      'Get ready for a nostalgic ride as Sarasota favorite Jazzmin Carson and her powerhouse friends take the stage for a tribute to the iconic women of the decade.',
    type: 'SEASON',
    cardDate: 'Mar 13 – 15'
  },
  {
    id: 'evt_hocus_pocus',
    name: 'Hocus Pocus Pops II',
    status: 'ON_SALE',
    isVisibleOnline: true,
    firstInstanceDatetime: '2025-10-30T19:00:00Z',
    lastInstanceDatetime: '2025-10-30T19:00:00Z',
    publicTicketsUrl: 'https://your-org.app.getcuebox.com/o/ABCD1234/shows/evt_hocus_pocus',
    publicImageUrl:
      'https://firebasestorage.googleapis.com/v0/b/the-pops-orchestra.firebasestorage.app/o/Pops%20Hocus%20Pocus%20Pops%20II.jpg?alt=media&token=2e40d3f9-19c5-41c5-a658-5a90f3e5e400',
    tags: ['halloween', 'family'],
    venues: [
      {
        name: 'Riverview Performing Arts Center',
        address: { line1: '', line2: '', city: 'Bradenton', region: 'FL', postal_code: '', country_code: 'US' }
      }
    ],
    subtitle: 'Add-On Show',
    description:
      'Hocus Pocus Pops returns with a spellbinding night of music, movement, and Halloween thrills. This high-energy concert features a spooky set list filled with eerie melodies and family-friendly fun.',
    type: 'ADD_ON',
    cardDate: 'Oct 30'
  },
  {
    id: 'evt_how_low',
    name: 'How Low Can You Go?',
    status: 'ON_SALE',
    isVisibleOnline: true,
    firstInstanceDatetime: '2026-04-11T15:00:00Z',
    lastInstanceDatetime: '2026-04-12T19:30:00Z',
    publicTicketsUrl: 'https://your-org.app.getcuebox.com/o/ABCD1234/shows/evt_how_low',
    publicImageUrl:
      'https://firebasestorage.googleapis.com/v0/b/the-pops-orchestra.firebasestorage.app/o/Pops%20How%20Low%20Can%20You%20Go.jpg?alt=media&token=3742dc15-b711-4884-8b8f-5172aef76481',
    tags: ['classical', 'finale'],
    venues: [
      {
        name: 'Riverview Performing Arts Center',
        address: { line1: '', line2: '', city: 'Bradenton', region: 'FL', postal_code: '', country_code: 'US' }
      },
      {
        name: 'Neel Performing Arts Center',
        address: { line1: '', line2: '', city: 'Bradenton', region: 'FL', postal_code: '', country_code: 'US' }
      }
    ],
    subtitle: 'Add-On Show',
    description:
      'The Pops Orchestra closes its 51st season with a thunderous finale that goes low — very low. This concert spotlights the often-unsung heroes of the orchestra.',
    type: 'ADD_ON',
    cardDate: 'Apr 11 – 12'
  }
]
