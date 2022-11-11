addLayer("a", {
    name: "Achievement",
    symbol: "<small>元素",
    position: 3,
    startData() { return {
        unlocked: true,
		points: n(0),
    }},
    color: "FFFFFF",
    resource: "Achievement",
    type: "none",
    row: "side", 
    layerShown(){return true},
    tooltip(){return '元素里程碑'},
	achievementPopups: true,
    achievements: {
        11: {
            name: "氢(H)",
            done() {return player.points.gte(10)},
            tooltip() {return "恭喜你解锁第一个元素氢(H)By 匿_名<br>———————————<br>最初的元素,简单到你什么都不用做就可以解锁<br>———————————<br>获得10质子"},
        },
        12: {
            name: "氦(He)",
            done() {return player.points.gte('1e100000')},
            tooltip() {return "恭喜你解锁第二个元素氦(He)By 寒寒<br>———————————<br>是不是有点难度,但别忘了,这只是第二个元素<br>———————————<br>获得1e100000质子"},
            unlocked(){return hasAchievement('a',11)}
        },
        13: {
            name: "锂(Li)",
            done() {return player.points.gte('1ee10')},
            tooltip() {return "恭喜你解锁第三个元素锂(Li)By 辉影神秘<br>———————————<br>终于不是气体了,所以你花了多久时间才到这里的?<br>———————————<br>获得1ee10质子"},
            unlocked(){return hasAchievement('a',12)}
        },
    },
	tabFormat: [
        ["display-text", function() {return `
		<br>
            <span class="overlayThing">你有 </span>
            <h2  class="overlayThing" id="points">${format(player.points)}</h2>
            <span class="overlayThing"> ${modInfo.pointsName}</span>
            <br>
            <span v-if="canGenPoints()"  class="overlayThing">(${tmp.other.oompsMag != 0 ? format(tmp.other.oomps) + " OOM" + (tmp.other.oompsMag < 0 ? "^OOM" : tmp.other.oompsMag > 1 ? "^" + tmp.other.oompsMag : "") + "s" : formatSmall(getPointGen())}/sec)</span>
		`}],
        ["display-text",function() { return `欢迎来到元素论!` },{"font-size": "42px", "font-family": "Comic Sans MS" }],
        ["display-text",function() { return `
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        Made by 元素论team` },{"font-size": "22px", "font-family": "Comic Sans MS" }],
        "blank",
        "blank",
        ["display-text",function() { return `你总共获得了 ${player.a.achievements.length} 个成就` },{"font-size": "26px", "font-family": "Comic Sans MS" }],
        "blank",
        "blank",
        "blank",
        "blank",
		"achievements",
        "blank",
        "blank",
        "blank",
        ["display-text",function() { return `元素论创始人:辉影神秘, 寒寒, 匿_名, 神之海, ajchen` },{"font-size": "22px", "font-family": "Comic Sans MS" }],
        ["display-text",function() { return `元素论team:辉影神秘, 寒寒, 匿_名, 神之海, ajchen, QwQe308` },{"font-size": "22px", "font-family": "Comic Sans MS" }],
        ["display-text",function() { return `特别感谢:cyxw` },{"font-size": "22px", "font-family": "Comic Sans MS" }],
    ],
})