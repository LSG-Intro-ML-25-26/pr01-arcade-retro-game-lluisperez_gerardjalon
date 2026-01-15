controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-up`,
    500,
    false
    )
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (characterAnimations.matchesRule(nena, characterAnimations.rule(Predicate.FacingRight)) || characterAnimations.matchesRule(nena, characterAnimations.rule(Predicate.MovingRight))) {
        projectile = sprites.createProjectileFromSprite(assets.image`bullet-1`, nena, 100, 0)
    } else if (characterAnimations.matchesRule(nena, characterAnimations.rule(Predicate.FacingDown)) || characterAnimations.matchesRule(nena, characterAnimations.rule(Predicate.MovingDown))) {
        projectile = sprites.createProjectileFromSprite(assets.image`bullet-1`, nena, 0, 100)
    } else if (characterAnimations.matchesRule(nena, characterAnimations.rule(Predicate.FacingLeft)) || characterAnimations.matchesRule(nena, characterAnimations.rule(Predicate.MovingLeft))) {
        projectile = sprites.createProjectileFromSprite(assets.image`bullet-1`, nena, -100, 0)
    } else if (characterAnimations.matchesRule(nena, characterAnimations.rule(Predicate.FacingUp)) || characterAnimations.matchesRule(nena, characterAnimations.rule(Predicate.MovingUp))) {
        projectile = sprites.createProjectileFromSprite(assets.image`bullet-1`, nena, 0, -100)
    } else {
    	
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-left`,
    500,
    false
    )
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    sprites.destroy(enemigo)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-right`,
    500,
    false
    )
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-down`,
    500,
    false
    )
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    statusbar2.value -= 10
pause(500)
})
let projectile: Sprite = null
let enemigo: Sprite = null
let nena: Sprite = null
let statusbar2 : StatusBarSprite = null
nena = sprites.create(assets.image`nena-front`, SpriteKind.Player)
nena.setStayInScreen(true)
controller.moveSprite(nena)
let statusbar = statusbars.create(20, 2, StatusBarKind.Health)
statusbar.attachToSprite(nena)
enemigo = sprites.create(assets.image`trump-front`, SpriteKind.Enemy)
statusbar2 = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
statusbar2.attachToSprite(enemigo)
scene.setBackgroundColor(0)
game.onUpdate(function () {
	
})
