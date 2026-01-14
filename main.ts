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
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . 3 3 3 . 3 3 3 . . . . . 
            . . . . 3 3 3 . 3 3 3 . . . . . 
            . . . . 3 3 3 3 3 3 3 . . . . . 
            . . . . . 3 3 3 3 3 . . . . . . 
            . . . . . 3 3 3 3 3 . . . . . . 
            . . . . . . 3 3 3 . . . . . . . 
            . . . . . . . 3 . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, nena, 100, 0)
    } else if (characterAnimations.matchesRule(nena, characterAnimations.rule(Predicate.FacingDown)) || characterAnimations.matchesRule(nena, characterAnimations.rule(Predicate.MovingDown))) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . 3 3 3 . 3 3 3 . . . . . 
            . . . . 3 3 3 . 3 3 3 . . . . . 
            . . . . 3 3 3 3 3 3 3 . . . . . 
            . . . . . 3 3 3 3 3 . . . . . . 
            . . . . . 3 3 3 3 3 . . . . . . 
            . . . . . . 3 3 3 . . . . . . . 
            . . . . . . . 3 . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, nena, 0, 100)
    } else if (characterAnimations.matchesRule(nena, characterAnimations.rule(Predicate.FacingLeft)) || characterAnimations.matchesRule(nena, characterAnimations.rule(Predicate.MovingLeft))) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . 3 3 3 . 3 3 3 . . . . . 
            . . . . 3 3 3 . 3 3 3 . . . . . 
            . . . . 3 3 3 3 3 3 3 . . . . . 
            . . . . . 3 3 3 3 3 . . . . . . 
            . . . . . 3 3 3 3 3 . . . . . . 
            . . . . . . 3 3 3 . . . . . . . 
            . . . . . . . 3 . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, nena, -100, 0)
    } else if (characterAnimations.matchesRule(nena, characterAnimations.rule(Predicate.FacingUp)) || characterAnimations.matchesRule(nena, characterAnimations.rule(Predicate.MovingUp))) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . 3 3 3 . 3 3 3 . . . . . 
            . . . . 3 3 3 . 3 3 3 . . . . . 
            . . . . 3 3 3 3 3 3 3 . . . . . 
            . . . . . 3 3 3 3 3 . . . . . . 
            . . . . . 3 3 3 3 3 . . . . . . 
            . . . . . . 3 3 3 . . . . . . . 
            . . . . . . . 3 . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, nena, 0, -100)
    } else {
    	
    }
    pause(2000)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-up`,
    500,
    false
    )
})
let projectile: Sprite = null
let nena: Sprite = null
nena = sprites.create(assets.image`nena-front`, SpriteKind.Player)
nena.setStayInScreen(true)
controller.moveSprite(nena)
