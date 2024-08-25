import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PlayerDamageType, PlayerDamageValueType, PlayerKlasa, PlayerStat } from '../../_models/player-models';
import { MeleeCalculatorService } from '../../_services/calculators/melee/melee-calculator.service';
import { ProjectileCalculatorService } from '../../_services/calculators/projectile/projectile-calculator.service';
import { MagicCalculatorService } from '../../_services/calculators/magic/magic-calculator.service';
import { DefenseCalculatorService } from '../../_services/calculators/defense/defense-calculator.service';

@Component({
  selector: 'app-kalkulator-base',
  templateUrl: './kalkulator-base.component.html',
  styleUrls: ['./kalkulator-base.component.css']
})
export class KalkulatorBaseComponent implements OnInit {
  PlayerDamageValueType = PlayerDamageValueType;

  stats: { [key: string]: number } = {
    "HP": 100,
    "Poziom": 5,
    "Obrażenia": 0,
    "Ochrona": 0,
    "Siła": 3,
    "Wytrzymałość": 3,
    "Zręczność": 3,
    "Zdolności myśliwskie": 3,
    "Inteligencja": 3,
    "Mana": 7,
    "Walka": 0,
    "Krąg": 0,
  }

  klasy: PlayerKlasa[] = [
    {
      name: "Obywatel",
      color: "#bef033"
    },
    {
      name: "Wojownik",
      color: "#f32d2d"
    },
    {
      name: "Myśliwy",
      color: "#07a321"
    },
    {
      name: "Mag",
      color: "#c9248a"
    },
  ]
  presentKlasa: PlayerKlasa = this.klasy[0];

  damageTypes: PlayerDamageType[] = [
    {
      name: "Wręcz",
      color: "#F66C6C",
    },
    {
      name: "Dystansowe",
      color: "#2AFC93",
    },
    {
      name: "Magiczne",
      color: "#B158F5",
    },
  ]
  presentDamageType: PlayerDamageType = this.damageTypes[0];

  mobPercentHp: number = 100;

  isCrit: boolean = false;

  slugaBeliara: boolean = false;
  polnocnyBarbarzynca: boolean = false;
  ciosKrytyczny: boolean = false;

  hasWeapon: boolean = true;

  isBow: boolean = true;
  bowTension: number = 100;
  quickCharge: number = 0;

  runeDamage: number = 5;
  wplywUmyslu: number = 0.1;
  magicTypes: string[] = [
    "Ogień",
    "Woda",
    "Natura",
    "Tajemna",
    "Mrok",
    "Światło",
    "Równowaga",
    "Chaos",
    "Krew"
  ]
  presentMagicType: string = this.magicTypes[0];

  numberControl = new FormControl('', [
    Validators.pattern('^[0-9]*$')
  ]);

  constructor(
    private meleeCalculator: MeleeCalculatorService,
    private projectileCalculator: ProjectileCalculatorService,
    private magicCalculator: MagicCalculatorService,
    private defenseCalculator: DefenseCalculatorService
  ) { }

  ngOnInit() {
  }

  toKeyArray(array: { [key: string]: number }): string[] {
    return Object.keys(array).map(key => {
      return key;
    });
  }

  validateNumber(event: KeyboardEvent) {
    const pattern = /^[0-9]*$/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  getCalculatedClawDamage(damageType: PlayerDamageValueType): number {
    let result = this.getCalculatedDamage(damageType);
    if(this.presentKlasa.name !=='Wojownik' || !this.slugaBeliara)
      return result;

    let hp = this.stats["HP"];
    let extra = hp*2 + this.stats["Obrażenia"];
    return result + extra;
  }

  getCalculatedDamage(damageType: PlayerDamageValueType): number {
    let result: number = 0;
    if (this.presentDamageType.name === "Wręcz")
      result = this.meleeCalculator.getMeleeCalculatedDamage(
        this.stats, this.isCrit, this.presentKlasa, this.mobPercentHp / 100.,
        this.polnocnyBarbarzynca, this.ciosKrytyczny, this.hasWeapon, damageType
      );
    else if (this.presentDamageType.name === "Dystansowe")
      result = this.projectileCalculator.getProjectileCalculatedDamage(
        this.stats, this.isCrit, this.presentKlasa, this.mobPercentHp / 100.,
        this.ciosKrytyczny, this.isBow, this.bowTension / 100., this.quickCharge, damageType
      );
    else if (this.presentDamageType.name === "Magiczne")
      result = this.magicCalculator.getMagicCalculatedDamage(
        this.stats, this.isCrit, this.presentKlasa, this.mobPercentHp / 100.,
        this.ciosKrytyczny, this.runeDamage, this.wplywUmyslu, this.presentMagicType, damageType)
    return Math.floor(result);
  }

  getCalculatedDefense(): number {
    return Math.floor(this.defenseCalculator.getDefenseCalculatedDamage(this.stats, this.presentKlasa));
  }

}
