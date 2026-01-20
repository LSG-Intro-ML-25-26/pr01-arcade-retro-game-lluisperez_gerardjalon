def animar_abajo():
    animation.run_image_animation(nena, assets.animation("""
        nena-animation-down
    """), 500, False)
controller.down.on_event(ControllerButtonEvent.PRESSED, animar_abajo)

def animar_arriba():
    animation.run_image_animation(nena, assets.animation("""
        nena-animation-up
    """), 500, False)
controller.up.on_event(ControllerButtonEvent.PRESSED, animar_arriba)

def animar_izquierda():
    animation.run_image_animation(nena, assets.animation("""
        nena-animation-left
    """), 500, False)
controller.left.on_event(ControllerButtonEvent.PRESSED, animar_izquierda)

def animar_derecha():
    animation.run_image_animation(nena, assets.animation("""
        nena-animation-right
    """), 500, False)
controller.right.on_event(ControllerButtonEvent.PRESSED, animar_derecha)


def disparar():
    if characterAnimations.matches_rule(nena, characterAnimations.rule(Predicate.FACING_RIGHT)) or characterAnimations.matches_rule(nena, characterAnimations.rule(Predicate.MOVING_RIGHT)):
        sprites.create_projectile_from_sprite(assets.image("bullet-1"), nena, 150, 0)
    elif characterAnimations.matches_rule(nena, characterAnimations.rule(Predicate.FACING_DOWN)) or characterAnimations.matches_rule(nena, characterAnimations.rule(Predicate.MOVING_DOWN)):
        sprites.create_projectile_from_sprite(assets.image("bullet-1"), nena, 0, 150)
    elif characterAnimations.matches_rule(nena, characterAnimations.rule(Predicate.FACING_LEFT)) or characterAnimations.matches_rule(nena, characterAnimations.rule(Predicate.MOVING_LEFT)):
        sprites.create_projectile_from_sprite(assets.image("bullet-1"), nena, -150, 0)
    elif characterAnimations.matches_rule(nena, characterAnimations.rule(Predicate.FACING_UP)) or characterAnimations.matches_rule(nena, characterAnimations.rule(Predicate.MOVING_UP)):
        sprites.create_projectile_from_sprite(assets.image("bullet-1"), nena, 0, -150)

controller.A.on_event(ControllerButtonEvent.PRESSED, disparar)


def al_golpear_enemigo(bala, enemigo):
    sprites.destroy(bala)
    vida_enemigo = statusbars.get_status_bar_attached_to(StatusBarKind.enemy_health, enemigo)
    if vida_enemigo:
        vida_enemigo.value -= 10

sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, al_golpear_enemigo)


def enemigo_muere(vida):
    enemigo = vida.sprite_attached_to()
    if enemigo:
        sprites.destroy(enemigo)

statusbars.on_zero(StatusBarKind.enemy_health, enemigo_muere)

def iniciar_nivel_1():
    global nena, vida_jugador

    tiles.set_current_tilemap(tilemap("""
        nivel1
    """))

    nena = sprites.create(assets.image("nena-front"), SpriteKind.player)
    nena.set_position(40, 470)
    controller.move_sprite(nena)
    scene.camera_follow_sprite(nena)

    vida_jugador = statusbars.create(20, 2, StatusBarKind.health)
    vida_jugador.attach_to_sprite(nena)


def crear_enemigo_tiktok():
    enemigo = sprites.create(assets.image("tiktok"), SpriteKind.enemy)
    enemigo.set_position(nena.x + randint(-60, 60), nena.y + randint(-60, 60))

    vida_enemigo = statusbars.create(20, 2, StatusBarKind.enemy_health)
    vida_enemigo.max = 20
    vida_enemigo.attach_to_sprite(enemigo)

    enemigo.follow(nena, 20)


def spawn_enemigos():
    crear_enemigo_tiktok()


vida_jugador: StatusBarSprite = None
nena: Sprite = None

iniciar_nivel_1()
game.on_update_interval(4000, spawn_enemigos)
