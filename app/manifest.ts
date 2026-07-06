import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sync Retreat - Founder Execution Program',
    short_name: 'Sync Retreat',
    description: '14-day execution program for founding teams in Leh, Ladakh at 3,524m altitude',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#c96e38',
    icons: [
      {
        src: '/assets/hero.jpeg',
        sizes: 'any',
        type: 'image/jpeg',
      },
    ],
  }
}
