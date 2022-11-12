addLayer("be", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: n(1),   
        depth:n(1),
        resource:"stone",
        health:n(10),
        highestdepth:n(1),
        resAmt:{
          stone:n(0),
          emerald:n(0),
          aquamarine:n(0),
        },
       money:n(0)
    }},

    color: "#4BDC13",                       // The color for this layer, which affects many elements.
    resource: "Beryllium",            // The name of this layer's main prestige resource.
    row: 0,                                 // The row this layer is on (0 is the first row).

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: n("eee3"),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return n(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns your exponent to your gain of the prestige resource.
        return n(1)
    },

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.

   upgrades: {
        11:{
          description:"Unlock Mining",
          cost:n(1),    
        },
        12:{
          description:"Unlock Market",
          cost:n(5),   
          currencyLayer:"be",
          currencyInternalName:"money",
          currencyDisplayName:"Money",
        },
       13:{
          description:"Unlock Advanture",
          cost:n(1000),   
          currencyLayer:"be",
          currencyInternalName:"money",
          currencyDisplayName:"Money",
        },
    },
   clickables:{
      1001:{
        display(){return player.be.resource},
        style(){
          let id=player.be.health.div(BE_orehealth()).times(255).floor().toNumber().toString(16)
          if(player.be.resource=="stone"){
            return{
              "background-color":`#888888${id}`
            }
          }
          if(player.be.resource=="emerald"){
            return{
              "background-color":`#88ff88`+id
            }
          }
          if(player.be.resource=="aquamarine"){
            return{
              "background-color":`#8888ff`+id
            }
          }
        }
      },
     2001:{
      display(){return "Sell for "+format(player.be.resAmt.stone.times(0.1))+" dollar."}, 
       canClick(){return true},
       onClick(){
         player.be.money=player.be.money.add(player.be.resAmt.stone.times(0.1))
         player.be.resAmt.stone=n(0)
         
       },
       style(){
          return{
            "min-height":"50px",
            "width":"200px",
          }
       },
     },
     2002:{
      display(){return "Sell for "+format(player.be.resAmt.aquamarine.times(1))+" dollar."}, 
       canClick(){return true},
       onClick(){
         player.be.money=player.be.money.add(player.be.resAmt.aquamarine.times(1))
         player.be.resAmt.aquamarine=n(0)
         
       },
       style(){
          return{
            "min-height":"50px",
            "width":"200px",
          }
       },
     },
     2003:{
      display(){return "Sell for "+format(player.be.resAmt.emerald.times(1))+" dollar."}, 
       canClick(){return true},
       onClick(){
         player.be.money=player.be.money.add(player.be.resAmt.emerald.times(1))
         player.be.resAmt.emerald=n(0)
         
       },
       style(){
          return{
            "min-height":"50px",
            "width":"200px",
          }
       },
     },
     10001:{
        display(){return "<"},
        canClick(){return player.be.depth.gte(2)},
       onClick(){
         player.be.depth=player.be.depth.sub(1)
       BE_getresource()
       },
       style(){
          return{
            "width":"50px",
            "min-height":"50px",
            "height":"50px",
          }
       },
      },
     10002:{
        display(){return ">"},
        canClick(){return player.be.highestdepth.gte(player.be.depth)},
       onClick(){
         player.be.depth=player.be.depth.add(1)
         BE_getresource(true)  
        },
       style(){
          return{
            "width":"50px",
            "min-height":"50px",
            "height":"50px",
          }
       },
      },
    },
  buyables:{
    1001: {
            title: "Better Pickaxe",
            display() {
               return "+" + format(tmp.be.buyables[1001].effect) + " power<br>Cost : " + format(tmp.be.buyables[1001].cost) + " Money"
            },
            unlocked() { return true},
            canAfford() { 
              return player.be.money.gte(tmp.be.buyables[1001].cost) 
            },
            cost(){
            return  n("5").times(n(1.5).pow(getBuyableAmount((this.layer),1001).pow(1.2)))
            },
            buy() { 
                {
                   player.be.money = player.be.money.minus(tmp.be.buyables[1001].cost)
                }
                setBuyableAmount("be", 1001, getBuyableAmount("be", 1001).add(1))
            },
            effect() { 
              return n(1).times(getBuyableAmount("be", 1001))          
            },
      style(){
          return{
            "height":"100px"
          }
       },
      },
    1002: {
            title: "Better Texture",
            display() {
               return "x" + format(tmp.be.buyables[1002].effect) + " power<br>Cost : " + format(tmp.be.buyables[1002].cost) + " Money"
            },
            unlocked() { return true},
            canAfford() { 
              return player.be.money.gte(tmp.be.buyables[1002].cost) 
            },
            cost(){
            return  n("25").times(n(1.6).pow(getBuyableAmount((this.layer),1002).pow(1.25)))
            },
            buy() { 
                {
                   player.be.money = player.be.money.minus(tmp.be.buyables[1002].cost)
                }
                setBuyableAmount("be", 1002, getBuyableAmount("be", 1002).add(1))
            },
            effect() { 
              return n(1).add(n(0.5).times(getBuyableAmount("be", 1002)))        
            },
      style(){
          return{
            "height":"100px"
          }
       },
      },
  },
   tabFormat:{
      "Upgrades":{
        content:[
           "main-display",
        "upgrades"    
      ]
      },
    "Mining":{
      unlocked(){return hasUpgrade('be',11)},
        content:[
        ["clickable",1001],
        "blank",
          ["raw-html",function(){return "Depth:" +format(player.be.depth)+"m"}],
        ["raw-html",function(){return "Health:" +format(player.be.health)+"/"+format(BE_orehealth())}],
          ["raw-html",function(){return "Power:" +format(BE_power())}],
          "blank",
          "blank",
         ["row",[["clickable",10001],["clickable",10002]]], 
      ]
    },
    "Resource":{
      unlocked(){return hasUpgrade('be',11)},
        content:[
          ["row",[["raw-html",function(){return "Stone:" +format(player.be.resAmt.stone)}],"blank",["clickable",2001]]],
          ["row",[["raw-html",function(){return "Aquamarine:" +format(player.be.resAmt.aquamarine)}],"blank",["clickable",2002]]],
          ["row",[["raw-html",function(){return "Emerald:" +format(player.be.resAmt.emerald)}],"blank",["clickable",2003]]],
          ["row",[["raw-html",function(){return "Money:" +format(player.be.money)}]]],
      ]
    },
     "Market":{
      unlocked(){return hasUpgrade('be',12)},
        content:[
        ["row",[["buyable",1001],["buyable",1002]]]
      ]
    },
    },
  update(diff){
  player.be.health=player.be.health.sub(BE_power().times(diff))
    if(player.be.health.lte(0))BE_getresource()
}
})
function BE_getresource(force=false){
  let random=Math.random()*100
  let list=[]
  if(player.be.depth.lte(100))list=[['stone',80],['aquamarine',10],['emerald',10]]
  if(player.be.depth.lte(9))list=[['stone',90],['aquamarine',5],['emerald',5]]
  if(player.be.depth.lte(4))list=[['stone',100]]
  
  let num=0
  for(let i=0; i<=list.length-1; i++){
    num+=list[i][1]
    if(random<=num){
     if(!force) {
       player.be.highestdepth=player.be.depth.max(player.be.highestdepth)
       player.be.resAmt[player.be.resource]=player.be.resAmt[player.be.resource].add(player.be.depth.pow(1.5))
       if(player.be.resource=="aquamarine"||player.be.resource=="emerald")player.be.points=player.be.points.add(player.be.depth.pow(1.5).floor())
     }
      player.be.resource=list[i][0]
      player.be.health=BE_orehealth()
    return;
  }
  }
}
function BE_orehealth(){
  let mult=n(1)
  if(player.be.resource=="aquamarine")mult=n(2)
  if(player.be.resource=="emerald")mult=n(2)
  return n(10).times(n(1.25).pow(player.be.depth.sub(1).pow(1.02))).times(mult)
}
function BE_power(){
    if(!hasUpgrade('be',11))return n(0)
  let power=n(1)
  power=power.add(tmp.be.buyables[1001].effect)
  power=power.times(tmp.be.buyables[1002].effect)
  return power
}