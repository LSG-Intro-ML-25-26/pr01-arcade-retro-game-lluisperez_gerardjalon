def on_up_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-up
            """),
        500,
        False)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_a_pressed():
    if characterAnimations.matches_rule(nena, characterAnimations.rule(Predicate.FACING_RIGHT)) or characterAnimations.matches_rule(nena, characterAnimations.rule(Predicate.MOVING_RIGHT)):
        sprites.create_projectile_from_sprite(assets.image("""
            bullet-1
            """), nena, 150, 0)
    elif characterAnimations.matches_rule(nena, characterAnimations.rule(Predicate.FACING_DOWN)) or characterAnimations.matches_rule(nena, characterAnimations.rule(Predicate.MOVING_DOWN)):
        sprites.create_projectile_from_sprite(assets.image("""
            bullet-1
            """), nena, 0, 150)
    elif characterAnimations.matches_rule(nena, characterAnimations.rule(Predicate.FACING_LEFT)) or characterAnimations.matches_rule(nena, characterAnimations.rule(Predicate.MOVING_LEFT)):
        sprites.create_projectile_from_sprite(assets.image("""
            bullet-1
            """), nena, -150, 0)
    elif characterAnimations.matches_rule(nena, characterAnimations.rule(Predicate.FACING_UP)) or characterAnimations.matches_rule(nena, characterAnimations.rule(Predicate.MOVING_UP)):
        sprites.create_projectile_from_sprite(assets.image("""
            bullet-1
            """), nena, 0, -150)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_left_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-left
            """),
        500,
        False)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_on_zero(vida):
    global enemigo3
    enemigo3 = vida.sprite_attached_to()
    if enemigo3:
        sprites.destroy(enemigo3)
statusbars.on_zero(StatusBarKind.enemy_health, on_on_zero)

def on_on_overlap(bala, enemigo):
    global vida_enemigo
    sprites.destroy(bala)
    vida_enemigo = statusbars.get_status_bar_attached_to(StatusBarKind.enemy_health, enemigo)
    if vida_enemigo:
        vida_enemigo.value -= 10
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap)

def on_right_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-right
            """),
        500,
        False)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def iniciar_nivel_1():
    global nena, vida_jugador
    tiles.set_current_tilemap(tilemap("""
        nivel1
        """))
    nena = sprites.create(assets.image("""
        nena-front
        """), SpriteKind.player)
    nena.set_position(40, 470)
    controller.move_sprite(nena)
    scene.camera_follow_sprite(nena)
    vida_jugador = statusbars.create(20, 2, StatusBarKind.health)
    vida_jugador.attach_to_sprite(nena)
def crear_enemigo_tiktok():
    global enemigo2, vida_enemigo2
    enemigo2 = sprites.create(assets.image("""
        tiktok
        """), SpriteKind.enemy)
    enemigo2.set_position(nena.x + randint(-60, 60), nena.y + randint(-60, 60))
    vida_enemigo2 = statusbars.create(20, 2, StatusBarKind.enemy_health)
    vida_enemigo2.max = 20
    vida_enemigo2.attach_to_sprite(enemigo2)
    enemigo2.follow(nena, 20)

def on_down_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-down
            """),
        500,
        False)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def sceneOne():
    game.show_long_text("Son les 3:33AM i demà tens examen d'Android, portes mirant TIKTOK dos hores",
        DialogLayout.CENTER)
    game.show_long_text("Per donar-li like a un més no passarà res...",
        DialogLayout.CENTER)
    scene.set_background_image(assets.image("""
        fondoMovil
        """))
vida_enemigo2: StatusBarSprite = None
enemigo2: Sprite = None
vida_jugador: StatusBarSprite = None
enemigo3: Sprite = None
nena: Sprite = None
vida_enemigo: StatusBarSprite = None
sceneOne()
iniciar_nivel_1()

def on_update_interval():
    crear_enemigo_tiktok()
game.on_update_interval(4000, on_update_interval)
