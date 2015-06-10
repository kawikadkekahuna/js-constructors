]
function Spell(name,cost,description){

   this.name = name;
   this.cost = cost;
   this.description = description;
]

   this.printDetails = function(){

      console.log('name ' + this.name + ' cost ' + this.cost + ' and does ' + this.description);

   };
}



function DamageSpell(name,cost,damage,description){

   Spell.call(this,name,cost,description);
   this.description = description;
   this.damage = damage;  
 }

 DamageSpell.prototype = Object.create(Spell.prototype, {
   constructor: {
      value: Spell
   }
 });



function Spellcaster(name,health,mana){
   DamageSpell.call(this,name);
   this.health = health;
   this.mana = mana;
   this.isAlive = true;



   this.inflictDamage = function(damage){
      this.health -= damage;

      if((this.health - damage) < 0){
         this.health = 0;
      }

      if(this.health === 0){
         this.isAlive = false;
      }
   };
   this.spendMana = function(cost){

      if(this.mana >= cost){
      this.mana -= cost;
      return true;
   }else{
      return false;
   }

};

this.invoke = function(spell,target){

   if(spell instanceof Spell && !(spell instanceof DamageSpell)){
      if(this.mana >= spell.cost){
         this.spendMana(spell.cost);
         return true;
      }else{
         return false;
      }
   }

   if((spell instanceof DamageSpell) && (target instanceof Spellcaster) && (spell.cost <= this.mana)) {

      this.spendMana(spell.cost);
      target.inflictDamage(spell.damage);
      return true;

   }else{
      return false;
   }




   };
}