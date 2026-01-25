namespace SpriteKind {
    export const menuItem = SpriteKind.create()
    export const cursor = SpriteKind.create()
    export const vacio = SpriteKind.create()
    export const Rose = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Rose, function (player2, rose) {
    rosa_actual = rose
})
function sceneStart () {
    Play = sprites.create(assets.image`fondo_inicio0`, SpriteKind.vacio)
    while (!(controller.A.isPressed())) {
        Play.setFlag(SpriteFlag.Invisible, true)
        pause(200)
        Play.setFlag(SpriteFlag.Invisible, false)
        pause(200)
    }
    Play.setFlag(SpriteFlag.Invisible, true)
    sceneOne()
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (nena) {
        ultima_direccion = "down"
        animation.runImageAnimation(
        nena,
        assets.animation`nena-animation-down`,
        500,
        false
        )
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (nena) {
        ultima_direccion = "right"
        animation.runImageAnimation(
        nena,
        assets.animation`nena-animation-right`,
        500,
        false
        )
    }
})
sprites.onDestroyed(SpriteKind.Enemy, function (enemigo2) {
    let j: number;
if (enemigos.indexOf(enemigo2) >= 0) {
        j = enemigos.indexOf(enemigo2)
        sprites.destroy(barras_enemigo[j])
        barras_enemigo.removeAt(j)
        enemigos.removeAt(j)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (nena) {
        ultima_direccion = "left"
        animation.runImageAnimation(
        nena,
        assets.animation`nena-animation-left`,
        500,
        false
        )
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(nena)) {
        return
    }
    music.play(music.createSoundEffect(WaveShape.Triangle, 4342, 4246, 232, 0, 106, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
    if (ultima_direccion == "right") {
        sprites.createProjectileFromSprite(assets.image`
            bullet-1
            `, nena, 150, 0)
    } else if (ultima_direccion == "left") {
        sprites.createProjectileFromSprite(assets.image`
            bullet-1
            `, nena, -150, 0)
    } else if (ultima_direccion == "up") {
        sprites.createProjectileFromSprite(assets.image`
            bullet-1
            `, nena, 0, -150)
    } else if (ultima_direccion == "down") {
        sprites.createProjectileFromSprite(assets.image`
            bullet-1
            `, nena, 0, 150)
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(nena) || !(rosa_actual)) {
        return
    }
    if (!(nena.overlapsWith(rosa_actual))) {
        rosa_actual = null
return
    }
    sprites.destroy(rosa_actual, effects.none, 0)
    rosa_actual = null
rosas += 1
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    if (rosas == 1) {
        poner_hud(assets.image`hud_rosas0`)
    } else if (rosas == 2) {
        poner_hud(assets.image`hud_rosas1`)
    } else {
        poner_hud(assets.image`hud_rosas2`)
        abrir_puerta()
    }
})
function scenethree () {
    scene.setBackgroundImage(assets.image`fondo_3am1`)
    game.showLongText("La pantalla s'estira. El soroll canvia. El temps s'atura. Notes el cos pesat. Com si caiguessis… cap endins.", DialogLayout.Bottom)
    iniciar_nivel_1()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (bala, enemigo) {
    let i: number;
sprites.destroy(bala)
    if (enemigos.indexOf(enemigo) >= 0) {
        i = enemigos.indexOf(enemigo)
        barras_enemigo[i].value += -10
        if (barras_enemigo[i].value <= 0) {
            sprites.destroy(enemigo)
        }
    }
})
function abrir_puerta () {
    tiles.setTileAt(tiles.getTileLocation(10, 5), assets.tile`transparency16`)
}
function scenetwo () {
    scene.setBackgroundImage(assets.image`fondo_3am0`)
    game.showLongText("El mòbil vibra. No és una notificació. Intentes bloquejar-lo. El botó no respon. Només un més. Aquesta vegada no ho decideixes tu.", DialogLayout.Bottom)
    scenethree()
}
function iniciar_nivel_1 () {
    let r: Sprite;
music.play(music.createSong(hex`
                    0078000408020405001c000f0a006400f4010a00000400000000000000000000000000000000021e0000000400021d2a1c0020000220252c003000031e242c34003800031e242c06001c00010a006400f40164000004000000000000000000000000000000000207000c001000021e2507001c00020a006400f40164000004000000000000000000000000000000000313000000040001271000140002242a20002400012a09010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c800360000000100010508000900020407140015000204091c001d00010b20002100020206280029000204083000310001093800390003000409
                    `), music.PlaybackMode.LoopingInBackground)
    nivel = 1
    rosas = 0
    rosa_actual = null
tiles.setCurrentTilemap(tilemap`nivel1`)
    nena = sprites.create(assets.image`nena-front`, SpriteKind.Player)
    nena.setPosition(40, 470)
    controller.moveSprite(nena, 100, 100)
    scene.cameraFollowSprite(nena)
    vida_jugador = statusbars.create(20, 2, StatusBarKind.Health)
    vida_jugador.attachToSprite(nena)
    poner_hud(assets.image`hud_rosas`)
    for (let index = 0; index < 3; index++) {
        r = sprites.create(assets.image`rose`, SpriteKind.Rose)
        tiles.placeOnRandomTile(r, assets.tile`miMosaico`)
    }
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (nena) {
        ultima_direccion = "up"
        animation.runImageAnimation(
        nena,
        assets.animation`nena-animation-up`,
        500,
        false
        )
    }
})
function crear_enemigo_tiktok () {
    enemigo22 = sprites.create(assets.image`tiktok`, SpriteKind.Enemy)
    enemigo22.setPosition(nena.x + randint(-60, 60), nena.y + randint(-60, 60))
    vida_enemigo2 = statusbars.create(20, 2, StatusBarKind.EnemyHealth)
    vida_enemigo2.max = 20
    vida_enemigo2.value = 20
    vida_enemigo2.attachToSprite(enemigo22)
    enemigo22.follow(nena, 20)
    enemigos.push(enemigo22)
    barras_enemigo.push(vida_enemigo2)
}
function poner_hud (img2: Image) {
    if (rosa_hud) {
        sprites.destroy(rosa_hud)
    }
    rosa_hud = sprites.create(img2, SpriteKind.vacio)
    rosa_hud.setFlag(SpriteFlag.RelativeToCamera, true)
    rosa_hud.z = 200
}
function sceneOne () {
    scene.setBackgroundImage(assets.image`fondo_3am`)
    game.showLongText("Son les 3:33 AM. El mòbil vibra una altra vegada. No recordes quan has obert TikTok… però tampoc quan l'has deixat.", DialogLayout.Bottom)
    scenetwo()
}
let rosa_hud: Sprite = null
let vida_enemigo2: StatusBarSprite = null
let enemigo22: Sprite = null
let vida_jugador: StatusBarSprite = null
let nivel = 0
let rosas = 0
let barras_enemigo: StatusBarSprite[] = []
let enemigos: Sprite[] = []
let Play: Sprite = null
let ultima_direccion = ""
let enemigo3 = null
let vida_enemigo = null
let nena : Sprite = null
let rosa = null
let rosa_actual : Sprite = null
ultima_direccion = "down"
scene.setBackgroundImage(assets.image`fondo_inicio1`)
sceneStart()
game.onUpdateInterval(4000, function () {
    if (nena && nivel == 1) {
        crear_enemigo_tiktok()
    }
})
