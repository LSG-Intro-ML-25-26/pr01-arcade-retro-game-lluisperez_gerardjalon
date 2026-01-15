def on_up_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-up
            """),
        500,
        False)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_a_pressed():
    global projectile
    if characterAnimations.matches_rule(nena, characterAnimations.rule(Predicate.FACING_RIGHT)) or characterAnimations.matches_rule(nena, characterAnimations.rule(Predicate.MOVING_RIGHT)):
        projectile = sprites.create_projectile_from_sprite(assets.image("""
            bullet-1
            """), nena, 100, 0)
    elif characterAnimations.matches_rule(nena, characterAnimations.rule(Predicate.FACING_DOWN)) or characterAnimations.matches_rule(nena, characterAnimations.rule(Predicate.MOVING_DOWN)):
        projectile = sprites.create_projectile_from_sprite(assets.image("""
            bullet-1
            """), nena, 0, 100)
    elif characterAnimations.matches_rule(nena, characterAnimations.rule(Predicate.FACING_LEFT)) or characterAnimations.matches_rule(nena, characterAnimations.rule(Predicate.MOVING_LEFT)):
        projectile = sprites.create_projectile_from_sprite(assets.image("""
            bullet-1
            """), nena, -100, 0)
    elif characterAnimations.matches_rule(nena, characterAnimations.rule(Predicate.FACING_UP)) or characterAnimations.matches_rule(nena, characterAnimations.rule(Predicate.MOVING_UP)):
        projectile = sprites.create_projectile_from_sprite(assets.image("""
            bullet-1
            """), nena, 0, -100)
    else:
        pass
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_left_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-left
            """),
        500,
        False)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_on_zero(status):
    sprites.destroy(enemigo)
statusbars.on_zero(StatusBarKind.enemy_health, on_on_zero)

def on_right_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-right
            """),
        500,
        False)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_down_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-down
            """),
        500,
        False)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def on_on_overlap(sprite, otherSprite):
    statusbar2.value -= 10
    pause(500)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap)

projectile: Sprite = None
enemigo: Sprite = None
nena: Sprite = None
statusbar2: StatusBarSprite = None
nena = sprites.create(assets.image("""
    nena-front
    """), SpriteKind.player)
nena.set_stay_in_screen(True)
controller.move_sprite(nena)
statusbar = statusbars.create(20, 2, StatusBarKind.health)
statusbar.attach_to_sprite(nena)
enemigo = sprites.create(assets.image("""
    trump-front
    """), SpriteKind.enemy)
statusbar2 = statusbars.create(20, 4, StatusBarKind.enemy_health)
statusbar2.attach_to_sprite(enemigo)

def on_on_update():
    pass
game.on_update(on_on_update)
