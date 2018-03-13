import Faction from './faction';

export class Ivits extends Faction {
  constructor() {
    super('Ivits', 'red');
    this.name = 'Ivits';
    this.color = 'red';
  }

  placeFirstStructure() {
    this.planetaryInstitute = 0;
    return buildType.PLANETARY_INSTITUTE;
  }
}

export default Ivits;
