namespace SpriteKind {
    export const menuItem = SpriteKind.create()
    export const cursor = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.cursor, SpriteKind.menuItem, function (cursor, item) {
    cursor.sayText("A per començar")
    if (controller.A.isPressed()) {
        item.setImage(assets.image`corazon-rojo`)
        pause(1000)
        sprites.destroy(cursor)
        sprites.destroy(item)
        iniciar_nivel_1()
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (nena) {
        animation.runImageAnimation(
        nena,
        assets.animation`nena-animation-up`,
        500,
        false
        )
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(nena)) {
        return
    }
    if (characterAnimations.matchesRule(nena, characterAnimations.rule(Predicate.FacingRight)) || characterAnimations.matchesRule(nena, characterAnimations.rule(Predicate.MovingRight))) {
        sprites.createProjectileFromSprite(assets.image`bullet-1`, nena, 150, 0)
    } else if (characterAnimations.matchesRule(nena, characterAnimations.rule(Predicate.FacingDown)) || characterAnimations.matchesRule(nena, characterAnimations.rule(Predicate.MovingDown))) {
        sprites.createProjectileFromSprite(assets.image`bullet-1`, nena, 0, 150)
    } else if (characterAnimations.matchesRule(nena, characterAnimations.rule(Predicate.FacingLeft)) || characterAnimations.matchesRule(nena, characterAnimations.rule(Predicate.MovingLeft))) {
        sprites.createProjectileFromSprite(assets.image`bullet-1`, nena, -150, 0)
    } else if (characterAnimations.matchesRule(nena, characterAnimations.rule(Predicate.FacingUp)) || characterAnimations.matchesRule(nena, characterAnimations.rule(Predicate.MovingUp))) {
        sprites.createProjectileFromSprite(assets.image`bullet-1`, nena, 0, -150)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (nena) {
        animation.runImageAnimation(
        nena,
        assets.animation`nena-animation-left`,
        500,
        false
        )
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (nena) {
        animation.runImageAnimation(
        nena,
        assets.animation`nena-animation-right`,
        500,
        false
        )
    }
})
function iniciar_nivel_1 () {
    tiles.setCurrentTilemap(tilemap`nivel1`)
    nena = sprites.create(assets.image`nena-front`, SpriteKind.Player)
    nena.setPosition(40, 470)
    controller.moveSprite(nena, 100, 100)
    scene.cameraFollowSprite(nena)
    vida_jugador = statusbars.create(20, 2, StatusBarKind.Health)
    vida_jugador.attachToSprite(nena)
}
function crear_enemigo_tiktok () {
    enemigo2 = sprites.create(assets.image`tiktok`, SpriteKind.Enemy)
    enemigo2.setPosition(nena.x + randint(-60, 60), nena.y + randint(-60, 60))
    vida_enemigo2 = statusbars.create(20, 2, StatusBarKind.EnemyHealth)
    vida_enemigo2.max = 20
    vida_enemigo2.attachToSprite(enemigo2)
    enemigo2.follow(nena, 20)
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (nena) {
        animation.runImageAnimation(
        nena,
        assets.animation`nena-animation-down`,
        500,
        false
        )
    }
})
function sceneOne () {
    scene.setBackgroundImage(assets.image`fondoMovil`)
    game.showLongText("Son les 3:33AM i demà tens examen d'Android, portes mirant TIKTOK dos hores", DialogLayout.Center)
    game.showLongText("Per donar-li like a un més no passarà res...", DialogLayout.Center)
    corazon = sprites.create(assets.image`corazon blanco`, SpriteKind.menuItem)
    corazon.setScale(1.5, ScaleAnchor.BottomLeft)
    corazon.setPosition(111, 90)
    corazon.vx = 0
    corazon.vy = 0
    cursor2 = sprites.create(assets.image`raton`, SpriteKind.cursor)
    cursor2.setPosition(154, 56)
    cursor2.z = 100
    cursor2.setFlag(SpriteFlag.StayInScreen, true)
    controller.moveSprite(cursor2, 100, 100)
    scene.cameraFollowSprite(cursor2)
}
let cursor2: Sprite = null
let corazon: Sprite = null
let vida_enemigo2: StatusBarSprite = null
let enemigo2: Sprite = null
let vida_jugador: StatusBarSprite = null
let enemigo3 = null
let vida_enemigo = null
let nena: Sprite = null
sceneOne()
game.onUpdateInterval(4000, function () {
    if (nena) {
        crear_enemigo_tiktok()
    }
})
