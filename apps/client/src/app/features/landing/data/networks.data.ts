export interface INetwork {
  name: string;
  image: string;
  descriptionKey: string;
  website?: string;
}

export const NETWORKS: INetwork[] = [
  {
    name: 'Segal Family Foundation',
    image: '/images/networks/SFFlogolong.png',
    descriptionKey: 'networks.items.segal.description',
    website: 'https://www.segalfamilyfoundation.org/'
  },
  {
    name: 'Afrilabs',
    image: '/images/networks/AfriLabs-m.png',
    descriptionKey: 'networks.items.afrilabs.description',
    website: 'https://www.afrilabs.com/'
  },
  {
    name: 'Catalyst Now',
    image: '/images/networks/catalyst.png',
    descriptionKey: 'networks.items.catalyst.description',
    website: 'https://catalystnow.net/'
  },
  {
    name: 'Impact Hub',
    image: '/images/networks/impact-hub.jpeg',
    descriptionKey: 'networks.items.impacthub.description',
    website: 'https://www.impacthub.net/'
  },
  {
    name: 'AEIP',
    image: '/images/networks/logo-aiep.webp',
    descriptionKey: 'networks.items.aeip.description',
    website: 'https://www.africaeuropeinnovation.net/fr/'
  }
];
