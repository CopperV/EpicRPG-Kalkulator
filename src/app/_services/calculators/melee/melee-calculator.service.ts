import { Injectable } from '@angular/core';
import { PlayerDamageValueType, PlayerKlasa } from '../../../_models/player-models';
import { FightUtilsService } from '../../utils/fight/fight-utils.service';

@Injectable({
  providedIn: 'root'
})
export class MeleeCalculatorService {

  meleeNormalStatsPriority: { [key: string]: number } = {
    "Siła": 0,
    "Zręczność": 1,
    "Zdolności myśliwskie": 2,
    "Wytrzymałość": 3,
    "Inteligencja": 4,
    "Mana": 5,
  };
  meleeCritStatsPriority: { [key: string]: number } = {
    "Zręczność": 0,
    "Siła": 1,
    "Zdolności myśliwskie": 2,
    "Inteligencja": 3,
    "Wytrzymałość": 4,
    "Mana": 5,
  };

  constructor(
    private utils: FightUtilsService
  ) { }

  getMeleeCalculatedDamage(
    stats: { [key: string]: number },
    crit: boolean,
    klasa: PlayerKlasa,
    mobPercentHp: number,
    polnocnyBarbarzynca: boolean,
    ciosKrytyczny: boolean,
    hasWeapon: boolean,
    damageType: PlayerDamageValueType
  ): number {
    let startList: {
      key: string,
      value: number,
      comparable: number,
      factor: number,
    }[] = [];
    startList.push({
      key: "Siła",
      value: stats["Siła"],
      comparable: stats["Siła"],
      factor: crit ? 4 : 4
    }, {
      key: "Wytrzymałość",
      value: stats["Wytrzymałość"],
      comparable: stats["Wytrzymałość"],
      factor: crit ? 1.4 : 1.4
    }, {
      key: "Zręczność",
      value: stats["Zręczność"],
      comparable: stats["Zręczność"],
      factor: crit ? 6.5 : 2
    }, {
      key: "Zdolności myśliwskie",
      value: stats["Zdolności myśliwskie"],
      comparable: stats["Zdolności myśliwskie"],
      factor: crit ? 2.7 : 1.8
    }, {
      key: "Inteligencja",
      value: stats["Inteligencja"],
      comparable: stats["Inteligencja"],
      factor: crit ? 1.8 : 1.5
    }, {
      key: "Mana",
      value: stats["Mana"],
      comparable: stats["Mana"] / 2,
      factor: crit ? 0.7 : 0.5
    });

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
        return crit ?
          this.meleeCritStatsPriority[stat1.key] - this.meleeCritStatsPriority[stat2.key] :
          this.meleeNormalStatsPriority[stat1.key] - this.meleeNormalStatsPriority[stat2.key];
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
        value: sortedList[1].value,
        comparable: sortedList[1].comparable,
        factor: sortedList[1].factor
      })
    }

    let dmg = stats["Obrażenia"];
    if (klasa.name === "Wojownik" && polnocnyBarbarzynca && !hasWeapon)
      dmg += stats["Siła"] * 0.8 + stats["Wytrzymałość"] * 0.65

    if (crit)
      dmg *= 1.25;
    dmg = Math.max(dmg, 1);

    if ((klasa.name === "Wojownik" && polnocnyBarbarzynca) || hasWeapon)
      pickedList
        .map(stat => (dmg * 0.25 + stat.value) * stat.factor)
        .forEach(addDmg => dmg += addDmg);

    dmg = this.utils.randomizeDamage(dmg, stats, damageType);
    dmg = this.utils.randomizeDamageByEntityHp(dmg, stats, mobPercentHp)
    
    let modifier: number = 1;

    if(crit && klasa.name === "Myśliwy")
      modifier += 0.15
    else if(!crit && klasa.name === "Wojownik")
      modifier += 0.15;
    
    if(crit && ciosKrytyczny && klasa.name === "Myśliwy")
      modifier += 0.15;

    return dmg * modifier;
  }

}
