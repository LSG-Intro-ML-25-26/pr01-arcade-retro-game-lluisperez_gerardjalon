namespace SpriteKind {
    export const menuItem = SpriteKind.create()
    export const cursor = SpriteKind.create()
    export const vacio = SpriteKind.create()
    export const Rose = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Rose, function (player2, rose) {
    sprites.destroy(rose)
    rosas += 1
    if (rosas >= 3) {
        abrir_puerta()
    }
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
function scenethree () {
    scene.setBackgroundImage(assets.image`fondo_3am1`)
    game.showLongText("La pantalla s'estira. El soroll canvia. El temps s'atura. Notes el cos pesat. Com si caiguessis… cap endins.", DialogLayout.Bottom)
    iniciar_nivel_1()
}
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
nivel = 1
    tiles.setCurrentTilemap(tilemap`nivel1`)
    for (let index = 0; index < 3; index++) {
        r = sprites.create(assets.image`rose`, SpriteKind.Rose)
        tiles.placeOnRandomTile(r, assets.tile`miMosaico`)
    }
    nena = sprites.create(assets.image`nena-front`, SpriteKind.Player)
    nena.setPosition(40, 470)
    controller.moveSprite(nena, 100, 100)
    scene.cameraFollowSprite(nena)
    rosa = sprites.create(assets.image`rose`, SpriteKind.Rose)
    vida_jugador = statusbars.create(20, 2, StatusBarKind.Health)
    vida_jugador.attachToSprite(nena)
    rosa_hud = sprites.create(assets.image`hud_rosas`, SpriteKind.Player)
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
    enemigo2 = sprites.create(assets.image`tiktok`, SpriteKind.Enemy)
    enemigo2.setPosition(nena.x + randint(-60, 60), nena.y + randint(-60, 60))
    vida_enemigo2 = statusbars.create(20, 2, StatusBarKind.EnemyHealth)
    vida_enemigo2.max = 20
    vida_enemigo2.attachToSprite(enemigo2)
    enemigo2.follow(nena, 20)
}
function sceneOne () {
    scene.setBackgroundImage(assets.image`fondo_3am`)
    game.showLongText("Son les 3:33 AM. El mòbil vibra una altra vegada. No recordes quan has obert TikTok… però tampoc quan l'has deixat.", DialogLayout.Bottom)
    scenetwo()
}
let vida_enemigo2: StatusBarSprite = null
let enemigo2: Sprite = null
let rosa_hud: Sprite = null
let vida_jugador: StatusBarSprite = null
let rosa: Sprite = null
let nivel = 0
let Play: Sprite = null
let rosas = 0
let ultima_direccion = ""
let enemigo3 = null
let vida_enemigo = null
let nena : Sprite = null
ultima_direccion = "down"
scene.setBackgroundImage(assets.image`fondo_inicio1`)
sceneStart()
game.onUpdateInterval(4000, function () {
    if (nena && nivel == 1) {
        crear_enemigo_tiktok()
    }
})
