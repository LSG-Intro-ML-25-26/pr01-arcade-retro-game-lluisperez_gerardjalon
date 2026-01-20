controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-down`,
    500,
    false
    )
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-right`,
    500,
    false
    )
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-left`,
    500,
    false
    )
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
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
statusbars.onZero(StatusBarKind.EnemyHealth, function (vida) {
    enemigo = vida.spriteAttachedTo()
    if (enemigo) {
        sprites.destroy(enemigo)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (bala, enemigo) {
    sprites.destroy(bala)
    vida_enemigo = statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, enemigo)
    if (vida_enemigo) {
        vida_enemigo.value -= 10
    }
})
function iniciar_nivel_1 () {
    tiles.setCurrentTilemap(tilemap`nivel1`)
    nena = sprites.create(assets.image`nena-front`, SpriteKind.Player)
    nena.setPosition(40, 470)
    controller.moveSprite(nena)
    scene.cameraFollowSprite(nena)
    vida_jugador = statusbars.create(20, 2, StatusBarKind.Health)
    vida_jugador.attachToSprite(nena)
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-up`,
    500,
    false
    )
})
function crear_enemigo_tiktok () {
    enemigo2 = sprites.create(assets.image`tiktok`, SpriteKind.Enemy)
    enemigo2.setPosition(nena.x + randint(-60, 60), nena.y + randint(-60, 60))
    vida_enemigo2 = statusbars.create(20, 2, StatusBarKind.EnemyHealth)
    vida_enemigo2.max = 20
    vida_enemigo2.attachToSprite(enemigo2)
    enemigo2.follow(nena, 20)
}
let vida_enemigo2: StatusBarSprite = null
let enemigo2: Sprite = null
let vida_jugador: StatusBarSprite = null
let vida_enemigo: StatusBarSprite = null
let enemigo: Sprite = null
let nena : Sprite = null
iniciar_nivel_1()
game.onUpdateInterval(4000, function () {
    crear_enemigo_tiktok()
})
