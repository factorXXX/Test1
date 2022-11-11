//锂 by 辉影神秘

function LiMineMain(){
    let pow = n(1).mul(10).mul(buyableEffect('li',11)[0]).pow(n(buyableEffect('li',13)[0]).add(1))
    return [
        pow,//力量
        n(0.25).mul(buyableEffect('li',11)[1]).div(buyableEffect('li',12)),//冷却
        [//显示
            n(0).mul(pow),
            pow,
        ],
    ]
}

function LiMinePicker(){
    let pow = n(1).mul(buyableEffect('li',21)[1]).mul(buyableEffect('li',13)[1]).mul(n(buyableEffect('li',22)[1]).add(1))
    return [
        pow,//力量
        n(20).sub(buyableEffect('li',22)[0]),//冷却
        [//显示
            n(0).mul(pow),
            pow,
        ],
    ]
}

function LiRestLayer1(){
    player.ore = n(0)
    player.ore_cold = n(0)
    player.picker_cold = n(0)
    player.pickTimes = n(0)
    player.bestOre = n(0)
    player.pickerpickTimes = n(0)
    player.lastPickTime = n(0)
}

addLayer("li", {
    name: "lithium",
    symbol: "Li",
    position: 0,
    startData() { return {
        unlocked: true,
        ore: n(0),
        ore_cold: [n(0)],
        picker_cold: [n(0)],

        bestOre: n(0),
        pickTimes: n(0),
        pickerpickTimes: n(0),
        lastPickTime: n(0),

        honour: n(0),
        knowledge: n(0),

		points: n(0),
        density: n(10),
        cold:[n(0)],
        power: n(0.01),
        impurities: n(0),

        totalOre: n(0),
        totalPickTimes: n(0),
        totalpickerpickTimes: n(0),
        totalHonour: n(0),
    }},
    color: "rgb(214,211,206)",
    resource: "锂",
    type: "none",
	effect(){
        let mul = player.li.totalHonour.add(1).pow(1234).max(1)

		let eff = n(0)
        eff = eff.add(n(11).sub(player.li.density).max(1).pow(5).log(10).max(1))
		return [mul,eff]
    },
    row: 2, 
	update(diff) {
        player.li.bestOre = n(player.li.ore).max(player.li.bestOre)

        player.li.ore_cold[0] = player.li.ore_cold[0].sub(n(1).mul(diff)).max(0)
        player.li.cold[0] = player.li.cold[0].sub(n(1).mul(diff)).max(0)

        player.li.picker_cold[0] = player.li.picker_cold[0].sub(n(1).mul(diff)).max(0)
        if(player.li.picker_cold[0].lte(0) && getBuyableAmount(this.layer, 21).gte(1)){
            layers.li.clickables['mine_picker_0'].onClick()
        }

        player.li.lastPickTime = player.li.lastPickTime.add(n(1).mul(diff)).max(0)

        player.li.honour = player.li.honour.add(n(buyableEffect('li',32)).mul(diff)).max(0)
        player.li.totalHonour = player.li.totalHonour.add(n(buyableEffect('li',32)).mul(diff)).max(0)
	},
    layerShown(){return false},
	clickables:{
        'mine_main_0':{
            title:'矿洞',
            display(){
                return '挖掘<br>冷却:'+formatTime(player.li.ore_cold[0])+'('+formatTime(LiMineMain()[1])+')<br>力量:'+format(LiMineMain()[2][0],2)+'~'+format(LiMineMain()[2][1],2)+'<br>获取倍率:x'+format(buyableEffect('li',31))+''
            },
            unlocked(){return true},
            style(){return {"font-size": "16px","width":"200px","height":"200px","border-radius":"50px","transition-duration":"0.5s","background-color":"rgb(214,211,206)","box-shadow":"0px 0px 30px rgb(214,211,206)"}},
            canClick(){return player.li.ore_cold[0].lte(0)},
            onClick(){
                player.li.ore = player.li.ore.add(n(Math.random()).mul(LiMineMain()[0]).mul(buyableEffect('li',31)))
                player.li.totalOre = player.li.totalOre.add(n(Math.random()).mul(LiMineMain()[0])).mul(buyableEffect('li',31))
                player.li.ore_cold[0] = player.li.ore_cold[0].add(LiMineMain()[1])
                player.li.lastPickTime = n(0)
                player.li.pickTimes = player.li.pickTimes.add(1)
                player.li.totalPickTimes = player.li.totalPickTimes.add(1)
            },
        },
        'mine_picker_0':{
            title:'小洞',
            display(){
                return '矿工挖掘<br>矿工冷却:'+formatTime(player.li.picker_cold[0])+'('+formatTime(LiMinePicker()[1])+')<br>矿工力量:'+format(LiMinePicker()[2][0],2)+'~'+format(LiMinePicker()[2][1],2)
            },
            unlocked(){return getBuyableAmount(this.layer, 21).gte(1)},
            style(){return {"font-size": "12px","width":"170px","height":"170px","border-radius":"50px","transition-duration":"0.5s","background-color":"rgb(214,211,206)","box-shadow":"0px 0px 30px rgb(214,211,206)"}},
            canClick(){return player.li.picker_cold[0].lte(0)},
            onClick(){
                player.li.ore = player.li.ore.add(n(Math.random()).mul(LiMinePicker()[0]))
                player.li.totalOre = player.li.totalOre.add(n(Math.random()).mul(LiMinePicker()[0]))
                player.li.picker_cold[0] = player.li.picker_cold[0].add(LiMinePicker()[1])
                player.li.pickerpickTimes = player.li.pickerpickTimes.add(1)
                player.li.totalpickerpickTimes = player.li.totalpickerpickTimes.add(1)
            }
        },
        11:{
        },
        12:{
            display(){
                return '净化<br>消耗:1锂<br>冷却:'+formatTime(player.li.cold[0])+'<br>挖掘强度:'+format(this.power(),4)
            },
            unlocked(){return true},
            style(){return {"font-size": "16px","width":"200px","height":"200px","border-radius":"50px","transition-duration":"0.5s","background-color":"rgb(214,211,206)","box-shadow":"0px 0px 30px rgb(214,211,206)"}},
            canClick(){return player.li.cold[0].lte(0) && player.li.points.gte(1)},
            power(){
                return n(1).add(player.li.power.div(n(11).sub(player.li.density).max(1)))
            },
            onClick(){
                player.li.power = n(Math.random()).div(10)
                player.li.density = player.li.density.div(this.power())
                player.li.impurities = player.li.impurities.add(this.power())
                player.li.ore_cold = player.li.ore_cold.add(0.1)
                player.li.cold[0] = player.li.cold[0].add(10)
                player.li.points = player.li.points.sub(1)
            }
        },
	},
    buyables: {
		11: {
			cost(x) { 
				return n(4.25).pow(n(x).add(1)).pow(n(x).div(100).add(1)).pow(n(x).max(1).div(10).max(1))
			},
			title(){return "力量("+format(getBuyableAmount(this.layer, this.id),0)+')'},
			display() { return "同时增加强度和冷却<br>"+"消耗:"+format(this.cost())+"矿石<br>"+"效果:<br>x"+format(buyableEffect('li',11)[0])+"力量<br>x"+format(buyableEffect('li',11)[1])+'冷却'},
			canAfford() { return player[this.layer].ore.gte(this.cost())},
			buy() {
				player[this.layer].ore = player[this.layer].ore.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect:function(x){{
				let eff = n(2.75).pow(x)
                let eff2 = n(2).pow(x)
				return [eff,eff2]
			}},
            style(){
                if(this.canAfford())
                return {"border-radius":"0px","width":"250px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"rgb(214,211,206)",}
                return {"border-radius":"0px","width":"250px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}
            },
			unlocked(){return true},
		},
        12: {
			cost(x) { 
				return n(4).pow(n(x).add(1)).max(1).max(1)
			},
			title(){
                let a = '未解锁'
                if(this.shown()){a = "耐力("+format(getBuyableAmount(this.layer, this.id),0)+')'}
                return a
            },
			display(){
                let a = '购买2级力量以解锁'
                if(this.shown()){a = "降低冷却<br>"+"消耗:"+format(this.cost())+"矿石<br>"+"效果:<br>÷"+format(buyableEffect('li',12))+'冷却'}
                return a
            },
			canAfford() { return player[this.layer].ore.gte(this.cost()) && this.shown()},
			buy() {
				player[this.layer].ore = player[this.layer].ore.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect:function(x){{
				let eff = n(1.5).pow(x)
				return eff
			}},
            style(){
                if(this.canAfford())
                return {"border-radius":"0px","width":"250px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"rgb(214,211,206)",}
                return {"border-radius":"0px","width":"250px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}
            },
            shown(){return getBuyableAmount(this.layer, 11).gte(2)},
			unlocked(){return true},
		},
        13: {
			cost(x) { 
				return n(11000).mul(n(x).pow(2.3).max(1)).pow(1.1)
			},
			title(){
                let a = '未解锁'
                if(this.shown()){a = "技巧("+format(getBuyableAmount(this.layer, this.id),0)+')'}
                return a
            },
			display(){
                let a = '购买2级压榨以解锁'
                if(this.shown()){a = "提升你的力量指数并且把你的一部分力量给予矿工<br>"+"消耗:"+format(this.cost())+"矿石<br>"+"效果:<br>+"+format(buyableEffect('li',13)[0])+'^力量(上限:0.50)<br>x'+format(buyableEffect('li',13)[1])+'矿工力量(基于你的力量)'}
                return a
            },
			canAfford() { return player[this.layer].ore.gte(this.cost()) && this.shown()},
			buy() {
				player[this.layer].ore = player[this.layer].ore.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect:function(x){{
				let eff = n(x).mul(0.04).min(0.5)
                let eff2 = n(LiMineMain()[0]).mul(n(x).mul(0.3)).max(1).logBase(n(10).sub(n(x).mul(0.1)).max(1.1)).pow(n(x).sub(100).max(0).mul(0.0001).add(1)).max(1)
				return [eff,eff2]
			}},
            style(){
                if(this.canAfford())
                return {"border-radius":"0px","width":"250px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"rgb(214,211,206)",}
                return {"border-radius":"0px","width":"250px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}
            },
            shown(){return getBuyableAmount(this.layer, 22).gte(1)},
			unlocked(){return getBuyableAmount(this.layer, 22).gte(1)},
		},
        21: {
			cost(x) { 
				return n(5000).pow(n(x).mul(0.2).add(1))
			},
			title(){
                let a = '未解锁'
                if(this.shown()){a = "矿工("+format(getBuyableAmount(this.layer, this.id),0)+')'}
                return a
            },
			display(){
                let a = '购买4级力量以解锁'
                if(this.shown()){a = "帮你挖矿<br>"+"消耗:"+format(this.cost())+"矿石<br>"+"效果:<br>冷却:"+formatTime(buyableEffect('li',21)[0])+"<br>力量:"+format(buyableEffect('li',21)[1])}
                return a
            },
			canAfford() { return player[this.layer].ore.gte(this.cost()) && this.shown()},
			buy() {
				player[this.layer].ore = player[this.layer].ore.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect:function(x){{
				let cold = n(20).sub(buyableEffect('li',22)[0])
                let eff = n(1e4).mul(n(x).pow(1))
				return [cold,eff]
			}},
            style(){
                if(this.canAfford())
                return {"border-radius":"0px","width":"250px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"rgb(214,211,206)",}
                return {"border-radius":"0px","width":"250px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}
            },
            shown(){return getBuyableAmount(this.layer, 11).gte(4)},
			unlocked(){return true},
		},
        22: {
			cost(x) { 
				return n(11000).pow(n(x).mul(0.12).add(1))
			},
			title(){
                let a = '未解锁'
                if(this.shown()){a = "压榨("+format(getBuyableAmount(this.layer, this.id),0)+')'}
                return a
            },
			display(){
                let a = '解锁方式未知'
                if(getBuyableAmount(this.layer, 11).gte(5)){a = '购买1级矿工以解锁'}
                if(this.shown()){a = "降低矿工冷却<br>"+"消耗:"+format(this.cost())+"矿石<br>"+"效果:<br>-"+format(buyableEffect('li',22)[0])+'冷却(上限:-10)<br>x'+format(buyableEffect('li',22)[1])+'矿工力量'}
                return a
            },
			canAfford() { return player[this.layer].ore.gte(this.cost()) && this.shown()},
			buy() {
				player[this.layer].ore = player[this.layer].ore.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect:function(x){{
				let eff = n(0.5).mul(x).min(10)
                let eff2 = n(3).pow(n(x).pow(0.25))
				return [eff,eff2]
			}},
            style(){
                if(this.canAfford())
                return {"border-radius":"0px","width":"250px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"rgb(214,211,206)",}
                return {"border-radius":"0px","width":"250px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}
            },
            shown(){return getBuyableAmount(this.layer, 21).gte(1)},
			unlocked(){return true},
		},
        23: {
			cost(x) { 
				return n(11000).mul(n(x).pow(2.3).max(1)).pow(1.1)
			},
			title(){
                let a = '未解锁'
                if(false){a = "技巧("+format(getBuyableAmount(this.layer, this.id),0)+')'}
                return a
            },
			display(){
                let a = '解锁方式未知'
                if(false){a = "提升你的力量指数并且把你的一部分力量给予矿工<br>"+"消耗:"+format(this.cost())+"矿石<br>"+"效果:<br>+"+format(buyableEffect('li',13)[0])+'^力量<br>x'+format(buyableEffect('li',13)[1])+'矿工力量(基于你的力量)'}
                return a
            },
			canAfford() { return player[this.layer].ore.gte(this.cost()) && false},
			buy() {
				player[this.layer].ore = player[this.layer].ore.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect:function(x){{
			}},
            style(){
                if(this.canAfford())
                return {"border-radius":"0px","width":"250px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"rgb(214,211,206)",}
                return {"border-radius":"0px","width":"250px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}
            },
			unlocked(){return getBuyableAmount(this.layer, 22).gte(1)},
		},
        31: {
			cost(x) { 
				return n(71000).mul(n(x).pow(2.8).max(1))
			},
			title(){
                let a = '未解锁'
                if(this.shown()){a = "蓄力("+format(getBuyableAmount(this.layer, this.id),0)+')'}
                return a
            },
			display(){
                let a = '购买2级压榨以解锁'
                if(this.shown()){a = "随时间以减弱的趋式提升最终矿石获取<br>"+"消耗:"+format(this.cost())+"矿石<br>"+"效果:<br>x"+format(buyableEffect('li',31))+'矿石获取(基于本次挖掘时间)'}
                return a
            },
			canAfford(){return player[this.layer].ore.gte(this.cost()) && this.shown()},
			buy() {
				player[this.layer].ore = player[this.layer].ore.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect:function(x){{
				let eff = player.li.lastPickTime.mul(x).pow(0.5).max(1)
				return eff
			}},
            style(){
                if(this.canAfford())
                return {"border-radius":"0px","width":"250px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"rgb(214,211,206)",}
                return {"border-radius":"0px","width":"250px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}
            },
            shown(){return getBuyableAmount(this.layer, 22).gte(2)},
			unlocked(){return getBuyableAmount(this.layer, 22).gte(1)},
		},
        32: {
			cost(x) { 
				return n(1e7).mul(n(x).add(1).pow(3.6).max(1)).pow(n(1.77).add(x))
			},
			title(){
                let a = '未解锁'
                if(this.shown()){a = "成就("+format(getBuyableAmount(this.layer, this.id),0)+')'}
                return a
            },
			display(){
                let a = '购买200级技巧以解锁'
                if(this.shown()){a = "矿石给你的成就感<br>"+"消耗:"+format(this.cost())+"矿石<br>"+"效果:<br>+"+format(buyableEffect('li',32))+'成就感获取(基于矿石)'}
                return a
            },
			canAfford(){return player[this.layer].ore.gte(this.cost()) && this.shown()},
			buy() {
				player[this.layer].ore = player[this.layer].ore.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect:function(x){{
				let eff = player.li.ore.pow(x).max(1).logBase(10).max(1).sub(12).max(0).pow(0.1)
				return eff
			}},
            style(){
                if(this.canAfford())
                return {"border-radius":"0px","border-color":"yellow","width":"250px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"rgb(214,211,206)",}
                return {"border-radius":"0px","border-color":"yellow","width":"250px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}
            },
            shown(){return getBuyableAmount(this.layer, 13).gte(200)},
			unlocked(){return getBuyableAmount(this.layer, 22).gte(1)},
		},
        33: {
			cost(x) { 
				return n(1e7).mul(n(x).pow(1.6).max(1)).pow(1.5)
			},
			title(){
                let a = '未解锁'
                if(this.shown()){a = "成就("+format(getBuyableAmount(this.layer, this.id),0)+')'}
                return a
            },
			display(){
                let a = '获得1e50矿石以解锁'
                if(this.shown()){a = "矿石给你的成就感<br>"+"消耗:"+format(this.cost())+"矿石<br>"+"效果:<br>x"+format(buyableEffect('li',31))+'矿石获取(基于本次挖掘时间)'}
                return a
            },
			canAfford(){return player[this.layer].ore.gte(this.cost()) && this.shown()},
			buy() {
				player[this.layer].ore = player[this.layer].ore.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect:function(x){{
				let eff = player.li.lastPickTime.mul(x).pow(n(0.25)).max(1)
				return eff
			}},
            style(){
                if(this.canAfford())
                return {"border-radius":"0px","border-color":"#00FFFF","width":"250px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"rgb(214,211,206)",}
                return {"border-radius":"0px","border-color":"#00FFFF","width":"250px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}
            },
            shown(){return false},
			unlocked(){return getBuyableAmount(this.layer, 22).gte(1)},
		},
    },
	microtabs:{
        "子荣耀":{
            "荣耀网格轮盘赌":{
                content:[
                    ["display-text",
                    function() { return ``},
                    ],
                ],
            },
        },
    },
    tabFormat: {
        "矿洞":{
            content:[
                ["display-text",
                    function() { return `你已经获得了 <h2 style="color: rgb(214,211,206); text-shadow: rgb(214,211,206) 0px 0px 10px;">`+format(player.li.ore)+`</h2> 矿石, 但显然这些都不是锂, 获得1e500矿石以获得第一个锂`},
                ],
                "blank",
                "blank",
                "blank",
                "blank",
                ['row',[['clickable', 'mine_main_0']]],
                "blank",
                "blank",
                "blank",
                ["display-text", function(){return '长按以快速购买'}],
                ['row',[['buyable', 11],['buyable', 12],['buyable', 13]]],
                ['row',[['buyable', 21],['buyable', 22],['buyable', 23]]],
                ['row',[['buyable', 31],['buyable', 32],['buyable', 33]]],
                "blank",
                "blank",
                "blank",
                "blank",
                ['row',[['clickable', 'mine_picker_0']]],
            ],
        },
        "荣耀":{
            content:[
                ["display-text",
                    function() { return `你已经获得了 <h2 style="color: yellow; text-shadow: yellow 0px 0px 10px;">`+format(player.li.achievement)+`</h2> 成就感, 它使你的质子生产变为 <h2 style="color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;">`+format(tmp.li.effect[0],3)+`</h2> 倍.`},
                ],
                "blank",
                "blank",
                ["microtabs","子荣耀",{'border-width':'0px'}],
            ],
        },
        "净化":{
            unlocked(){return false},
            content:[
                ["display-text",
                    function() { return `你有 <h2 style="color: rgb(214,211,206); text-shadow: rgb(214,211,206) 0px 0px 10px;">`+format(player.li.points,0)+`</h2> 块不纯净的理, 它们的密度是 <h2 style="color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;">`+format(player.li.density,3)+`</h2>g/cm³(纯锂为0.534g/cm³) ,它使你的质子生产变为 <h2 style="color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;">`+format(tmp.li.effect[1],3)+`</h2> 次方.` },
                ],
                "blank",
                "blank",
                "blank",
                "blank",
                ["clickable", 12],
                "blank",
                "blank",
                "blank",
                "blank",
                ["display-text",
                    function() { return `你从净化的锂碎料中获得了 <h2 style="color: rgb(214,211,206); text-shadow: rgb(214,211,206) 0px 0px 10px;">`+format(player.li.impurities)+`</h2> 杂质`},
                ],
            ],
        },
    },
})


