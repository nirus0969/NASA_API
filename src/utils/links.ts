export type LinkKey = 'CME' | 'FLR' | 'RBE' | 'SEP' | 'MPC'

export const links: Record<LinkKey, { route: string; name: string }> = {
  CME: { route: '/project1/CME', name: 'Coronal Mass Ejection' },
  FLR: { route: '/project1/FLR', name: 'Solar Flare' },
  RBE: { route: '/project1/RBE', name: 'Radiation Belt Enhancement' },
  SEP: { route: '/project1/SEP', name: 'Solar Energetic Particle' },
  MPC: { route: '/project1/MPC', name: 'Magnetopause Crossing' },
}

export const getLink = (key: LinkKey) => links[key]
