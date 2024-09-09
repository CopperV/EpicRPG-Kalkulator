import { Injectable } from '@angular/core';
import { FightUtilsService } from '../../utils/fight/fight-utils.service';
import { PlayerKlasa } from '../../../_models/player-models';
import { UtilsService } from '../../utils/normal/utils.service';

@Injectable({
  providedIn: 'root'
})
export class DefenseCalculatorService {

constructor(
  private utils: FightUtilsService,
  private baseUtils: UtilsService
) { }

getDefenseCalculatedDamage(
  stats: { [key: string]: number },
  klasa: PlayerKlasa,
  clanDefBoost: number
): number {
  clanDefBoost = this.baseUtils.clamp(clanDefBoost, 0, 0.1);

  let ochrona = stats["Ochrona"];
  let wytrzymalosc = stats["Wytrzymałość"];

  let ochronaDamage = Math.max(ochrona * 0.33, 0);
  let wytrzymaloscDamage = Math.max(0.0003 * wytrzymalosc * ochrona, 0);

  let finalOchrona = ochronaDamage + wytrzymaloscDamage;

  let modifier = 1;

  modifier += clanDefBoost;
  if(klasa.name === "Wojownik")
    modifier += 0.1;

  return finalOchrona * modifier;
}

}
