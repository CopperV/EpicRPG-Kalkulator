import { Injectable } from '@angular/core';
import { FightUtilsService } from '../../utils/fight/fight-utils.service';
import { PlayerKlasa, PlayerDamageValueType } from '../../../_models/player-models';

@Injectable({
  providedIn: 'root'
})
export class MagicCalculatorService {

  constructor(
    private utils: FightUtilsService
  ) { }

  getMagicCalculatedDamage(
    stats: { [key: string]: number },
    crit: boolean,
    klasa: PlayerKlasa,
    mobPercentHp: number,
    ciosKrytyczny: boolean,
    runeDamage: number,
    wplywUmyslu: number,
    magicType: string,
    damageType: PlayerDamageValueType
  ): number {

    let bounsDmg = 0;
    let level = stats["Poziom"];
    let inteligencja = stats["Inteligencja"];
    let mana = stats["Mana"];
    let krag = stats["Krąg"];

    if(wplywUmyslu > 0)
      runeDamage += stats["Obrażenia"] / wplywUmyslu / 100.;
    
    if(crit) {
      runeDamage *= 2;
      wplywUmyslu *= 1.25;
    }

    runeDamage += wplywUmyslu * inteligencja * runeDamage / 100.;

    bounsDmg += runeDamage * 0.008 * level;
    bounsDmg += runeDamage * 0.0002 * mana;
    bounsDmg += runeDamage * 0.1 * krag;
    runeDamage += bounsDmg;
    
    runeDamage = this.utils.randomizeDamage(runeDamage, stats, damageType);
    runeDamage = this.utils.randomizeDamageByEntityHp(runeDamage, stats, mobPercentHp);

    let modifier: number = 1;

    if (klasa.name === "Mag")
      modifier += 0.1;

    if (crit && ciosKrytyczny && klasa.name === "Myśliwy")
      modifier += 0.15;

    return runeDamage * modifier;
  }

}
