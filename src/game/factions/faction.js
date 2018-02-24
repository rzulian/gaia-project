class Faction {
  constructor(
    name,
    color,
    credits = 15,
    ore = 4,
    knowledge = 3,
    qic = 1,
    power1 = 2,
    power2 = 4
  ) {
    this.name = name;
    this.color = color;
    this.credits = credits;
    this.ore = ore;
    this.knowledge = knowledge;
    this.qic = qic;
    this.power = { gaia: 0, power1: power1, power2: power2, power3: 0 };
    this.mines = {
      cost: { credits: 2, ore: 1 },
      income: { ore: [1, 2, 3, 3, 4, 5, 6, 7, 8] },
      mines: 8
    };
  }

  burn(num_power) {
    if (this.power.power1 > 0) {
      throw 'StillPowerInArea1';
    } else if (this.power.power2 >= num_power * 2) {
      this.power.power2 -= num_power * 2;
      this.power.power3 += num_power;
    } else {
      throw 'NotEnoughPowerToBurn';
    }
  }

  charge(num_power) {
    let max_power = num_power;
    let min_power1 = Math.min(max_power, this.power.power1);
    max_power -= min_power1;
    this.power.power1 -= min_power1;
    this.power.power2 += min_power1;

    let min_power2 = Math.min(max_power, this.power.power2);
    max_power -= min_power2;
    this.power.power2 -= min_power2;
    this.power.power3 += min_power2;
    return num_power - max_power; //to decrease victory points¯
  }

  buildMine() {
    let canSpend =
      this.credits >= this.mines.cost.credits &&
      this.ore >= this.mines.cost.ore;
    let hasMines = this.mines.mines > 0;
    if (canSpend && hasMines) {
      this.credits -= this.mines.cost.credits;
      this.ore -= this.mines.cost.ore;
      --this.mines.mines;
      return true;
    } else {
      return false;
    }
  }
}
export default Faction;

/* Readonly our $hadschhallas => { 
    C => 15, W => 4, K => 3, Q => 1, P1 => 2, P2 => 4,
    ECONOMY => 2,
    color => 'red',
    display => "HadschHallas",
    faction_board_id => 7,
    ship => { 
        level => 1, max_level => 5,
        advance_cost => { C => 4, P => 1 },
        advance_gain => [ { VP => 0 },
                          { VP => 2 },
                          { VP => 3 },
                          { VP => 4 },
                          { VP => 5 } ],
    },
    dig => {
        level => 0, max_level => 2,
        cost => [ { W => 3 }, { W => 2 }, { W => 1 } ],
        advance_cost => { W => 2, C => 5, P => 1 },
        advance_gain => [ { VP => 6 },
                          { VP => 6 } ],
    },
    buildings => {
        D => { advance_cost => { W => 1, C => 2 },
               income => { W => [ 1, 2, 3, 3, 4, 5, 6, 7, 8 ] } },
        TP => { advance_cost => { W => 2, C => 3 },
                income => { C => [ 3, 6, 10, 14, 19 ] } },
        TE => { advance_cost => { W => 3, C => 5 },
                income => { K => [ 1, 2, 3, 4 ] } },
        SH => { advance_cost => { W => 4, C => 6 },
                advance_gain => [ { CREDIT_CHANGE => 1 } ],
                income => { PW => [ 0, 4 ] } },
        SA => { advance_cost => { W => 4, C => 8 },
                income => { P => [ 0, 1 ] } },
    }
};
 */
