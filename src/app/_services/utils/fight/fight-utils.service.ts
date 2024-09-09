import { Injectable } from '@angular/core';
import { UtilsService } from '../normal/utils.service';
import { PlayerDamageValueType } from '../../../_models/player-models';

@Injectable({
  providedIn: 'root'
})
export class FightUtilsService {

  constructor(
    private utils: UtilsService
  ) { }

  randomizeDamageByEntityHp(dmg: number, stats: { [key: string]: number }, entityHp: number): number {
    entityHp = this.utils.clamp(entityHp, 0, 1);
    let zrFactor = Math.min(stats["Zręczność"] * (0.01*0.02), 0.3);
    let minFactor = 1 - zrFactor;
    let maxFactor = 1 + zrFactor;
    let percent = this.utils.scale(0, 1, maxFactor, minFactor, entityHp);
    return dmg*percent;
  }

  randomizeDamage(dmg: number, stats: { [key: string]: number }, damageType: PlayerDamageValueType): number {
    if(damageType === PlayerDamageValueType.NORMAL)
      return dmg;

    let mod = stats["Zręczność"] / (35. * 100);
    mod = damageType === PlayerDamageValueType.MIN ? 0.95 - mod : 1.05 + mod;
    return dmg * mod;
  }

}
