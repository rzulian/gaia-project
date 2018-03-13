import Faction from './faction';


test('Discard as free action', () => {
  const faction = new Faction;
  const state = {};
  faction.discard_free_action(2);

  expect(faction.power.power3).toBe(2);

  //expect(faction.discard_free_action(2)).toThrowErrorMatchingSnapshot();
  expect(faction.discard_free_action(2)).toThrowError('NotEnoughPowerToDiscard');


});

test('Gain', () => {
    const faction = new Faction;
    const state = {};
    faction.gain(1);
    expect(faction.power.power1).toBe(3);
  });
  