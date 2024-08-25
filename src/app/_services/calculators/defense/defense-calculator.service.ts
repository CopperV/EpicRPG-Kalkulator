import { Injectable } from '@angular/core';
import { FightUtilsService } from '../../utils/fight/fight-utils.service';
import { PlayerKlasa } from '../../../_models/player-models';

@Injectable({
  providedIn: 'root'
})
export class DefenseCalculatorService {

constructor(
  private utils: FightUtilsService
) { }

getDefenseCalculatedDamage(
  stats: { [key: string]: number },
  klasa: PlayerKlasa,
): number {
  let ochrona = stats["Ochrona"];
  let wytrzymalosc = stats["Wytrzymałość"];

  let ochronaDamage = Math.max(ochrona * 0.33, 0);
  let wytrzymaloscDamage = Math.max(0.0003 * wytrzymalosc * ochrona, 0);

  let finalOchrona = ochronaDamage + wytrzymaloscDamage;
  if(klasa.name === "Wojownik")
    finalOchrona *= 1.1;

  return finalOchrona;
}

}
