import { Injectable } from '@angular/core';
import { FightUtilsService } from '../../utils/fight/fight-utils.service';
import { PlayerDamageValueType, PlayerKlasa } from '../../../_models/player-models';
import { UtilsService } from '../../utils/normal/utils.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectileCalculatorService {

  bowStatsPriority: { [key: string]: number } = {
    "Zdolności myśliwskie": 0,
    "Zręczność": 1,
    "Wytrzymałość": 2,
    "Siła": 3,
    "Mana": 4,
    "Inteligencja": 5,
  };
  crossStatsPriority: { [key: string]: number } = {
    "Zdolności myśliwskie": 0,
    "Wytrzymałość": 1,
    "Zręczność": 2,
    "Siła": 3,
    "Mana": 4,
    "Inteligencja": 5,
  };

  constructor(
    private utils: FightUtilsService,
    private baseUtils: UtilsService
  ) { }

  getProjectileCalculatedDamage(
    stats: { [key: string]: number },
    crit: boolean,
    klasa: PlayerKlasa,
    mobPercentHp: number,
    ciosKrytyczny: boolean,
    isBow: boolean,
    bowTension: number,
    quickCharge: number,
    damageType: PlayerDamageValueType,
    clanDmgBoost: number
  ): number {
    let startList: {
      key: string,
      value: number,
      comparable: number,
      factor: number,
    }[] = [];
    if (isBow) {
      startList.push({
        key: "Siła",
        value: stats["Siła"],
        comparable: stats["Siła"],
        factor: crit ? 3.2 : 2.3
      }, {
        key: "Wytrzymałość",
        value: stats["Wytrzymałość"],
        comparable: stats["Wytrzymałość"],
        factor: crit ? 3.5 : 2.3
      }, {
        key: "Zręczność",
        value: stats["Zręczność"],
        comparable: stats["Zręczność"],
        factor: crit ? 5 : 3.5
      }, {
        key: "Zdolności myśliwskie",
        value: stats["Zdolności myśliwskie"],
        comparable: stats["Zdolności myśliwskie"],
        factor: crit ? 6.5 : 4.9
      }, {
        key: "Inteligencja",
        value: stats["Inteligencja"],
        comparable: stats["Inteligencja"],
        factor: crit ? 2.3 : 1.9
      }, {
        key: "Mana",
        value: stats["Mana"],
        comparable: stats["Mana"] / 2,
        factor: crit ? 1.3 : 1
      });
    } else {
      startList.push({
        key: "Siła",
        value: stats["Siła"],
        comparable: stats["Siła"],
        factor: crit ? 3.2 : 2.3
      }, {
        key: "Wytrzymałość",
        value: stats["Wytrzymałość"],
        comparable: stats["Wytrzymałość"],
        factor: crit ? 5 : 4
      }, {
        key: "Zręczność",
        value: stats["Zręczność"],
        comparable: stats["Zręczność"],
        factor: crit ? 3.7 : 2.7
      }, {
        key: "Zdolności myśliwskie",
        value: stats["Zdolności myśliwskie"],
        comparable: stats["Zdolności myśliwskie"],
        factor: crit ? 6.5 : 4.9
      }, {
        key: "Inteligencja",
        value: stats["Inteligencja"],
        comparable: stats["Inteligencja"],
        factor: crit ? 2.3 : 1.9
      }, {
        key: "Mana",
        value: stats["Mana"],
        comparable: stats["Mana"] / 2,
        factor: crit ? 1.3 : 1
      });
    }

    let sortedList: {
      key: string,
      value: number,
      comparable: number,
      factor: number,
    }[] = startList
      .filter(stat => stat.comparable > 0)
      .sort((stat1, stat2) => {
        if (stat1.comparable !== stat2.comparable)
          return stat2.comparable - stat1.comparable;
        return isBow ?
          this.bowStatsPriority[stat1.key] - this.bowStatsPriority[stat2.key] :
          this.crossStatsPriority[stat1.key] - this.crossStatsPriority[stat2.key];
      });

    let pickedList: {
      key: string,
      value: number,
      comparable: number,
      factor: number,
    }[] = [];
    if (sortedList.length > 0)
      pickedList.push(sortedList[0])
    if (sortedList.length > 1) {
      pickedList.push({
        key: sortedList[1].key,
        value: sortedList[1].value * 0.5,
        comparable: sortedList[1].comparable,
        factor: sortedList[1].factor
      })
    }

    clanDmgBoost = this.baseUtils.clamp(clanDmgBoost, 0, 0.2);
    bowTension = this.baseUtils.clamp(bowTension, 0, 1);
    quickCharge = this.baseUtils.clamp(quickCharge, 0, 5);

    let dmg = stats["Obrażenia"];
    if(isBow)
      dmg *= bowTension
    else {
      dmg *= 1.4 - 0.2*quickCharge;
    }
    if (crit)
      dmg *= 1.44;
    dmg = Math.max(dmg, 1);

    pickedList
      .map(stat => (dmg * 0.35 + stat.value) * stat.factor)
      .forEach(addDmg => dmg += addDmg);

    dmg = this.utils.randomizeDamage(dmg, stats, damageType);
    dmg = this.utils.randomizeDamageByEntityHp(dmg, stats, mobPercentHp)

    let modifier: number = 1;

    modifier += clanDmgBoost;
    if (klasa.name === "Myśliwy")
      modifier += 0.15;

    if (crit && ciosKrytyczny && klasa.name === "Myśliwy")
      modifier += 0.15;

    return dmg * modifier;
  }

}
