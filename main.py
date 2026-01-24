@namespace
class SpriteKind:
    menuItem = SpriteKind.create()
    cursor = SpriteKind.create()
    vacio = SpriteKind.create()
    Rose = SpriteKind.create()
def sceneStart():
    global Play
    Play = sprites.create(assets.image("""
        parpadeo
        """), SpriteKind.vacio)
    while not (controller.A.is_pressed()):
        Play.set_flag(SpriteFlag.INVISIBLE, True)
        pause(200)
        Play.set_flag(SpriteFlag.INVISIBLE, False)
        pause(200)
    Play.set_flag(SpriteFlag.INVISIBLE, True)
    sceneOne()

def on_down_pressed():
    global ultima_direccion
    if nena:
        ultima_direccion = "down"
        animation.run_image_animation(nena,
            assets.animation("""
                nena-animation-down
                """),
            500,
            False)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def on_right_pressed():
    global ultima_direccion
    if nena:
        ultima_direccion = "right"
        animation.run_image_animation(nena,
            assets.animation("""
                nena-animation-right
                """),
            500,
            False)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_left_pressed():
    global ultima_direccion
    if nena:
        ultima_direccion = "left"
        animation.run_image_animation(nena,
            assets.animation("""
                nena-animation-left
                """),
            500,
            False)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_a_pressed():
    if not (nena):
        return
    if ultima_direccion == "right":
        sprites.create_projectile_from_sprite(assets.image("""
            bullet-1
            """), nena, 150, 0)
    elif ultima_direccion == "left":
        sprites.create_projectile_from_sprite(assets.image("""
            bullet-1
            """), nena, -150, 0)
    elif ultima_direccion == "up":
        sprites.create_projectile_from_sprite(assets.image("""
            bullet-1
            """), nena, 0, -150)
    elif ultima_direccion == "down":
        sprites.create_projectile_from_sprite(assets.image("""
            bullet-1
            """), nena, 0, 150)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def scenethree():
    scene.set_background_image(assets.image("""
        fondo_3am1
        """))
    game.show_long_text("La pantalla s'estira. El soroll canvia. El temps s'atura. Notes el cos pesat. Com si caiguessis… cap endins.",
        DialogLayout.BOTTOM)
    iniciar_nivel_1()
def abrir_puerta():
    tiles.set_tile_at(tiles.get_tile_location(10, 5),
        assets.tile("""
            transparency16
            """))
def scenetwo():
    scene.set_background_image(assets.image("""
        fondo_3am0
        """))
    game.show_long_text("El mòbil vibra. No és una notificació. Intentes bloquejar-lo. El botó no respon. Només un més. Aquesta vegada no ho decideixes tu.",
        DialogLayout.BOTTOM)
    scenethree()

def on_on_overlap(player2, rose):
    global rosas
    sprites.destroy(rose)
    rosas += 1
    if rosas >= 3:
        abrir_puerta()
sprites.on_overlap(SpriteKind.player, SpriteKind.Rose, on_on_overlap)

def iniciar_nivel_1():
    global nivel, nena, rosa, vida_jugador
    nivel = 1
    tiles.set_current_tilemap(tilemap("""
        nivel1
        """))
    for index in range(3):
        r = sprites.create(assets.image("""
            rose
            """), SpriteKind.Rose)
        tiles.place_on_random_tile(r, assets.tile("""
            miMosaico
            """))
    nena = sprites.create(assets.image("""
        nena-front
        """), SpriteKind.player)
    nena.set_position(40, 470)
    controller.move_sprite(nena, 100, 100)
    scene.camera_follow_sprite(nena)
    rosa = sprites.create(assets.image("""
        rose
        """), SpriteKind.Rose)
    vida_jugador = statusbars.create(20, 2, StatusBarKind.health)
    vida_jugador.attach_to_sprite(nena)

def on_up_pressed():
    global ultima_direccion
    if nena:
        ultima_direccion = "up"
        animation.run_image_animation(nena,
            assets.animation("""
                nena-animation-up
                """),
            500,
            False)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

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
def sceneOne():
    scene.set_background_image(assets.image("""
        fondo_3am
        """))
    game.show_long_text("Son les 3:33 AM. El mòbil vibra una altra vegada. No recordes quan has obert TikTok… però tampoc quan l'has deixat.",
        DialogLayout.BOTTOM)
    scenetwo()
vida_enemigo2: StatusBarSprite = None
enemigo2: Sprite = None
vida_jugador: StatusBarSprite = None
rosa: Sprite = None
nivel = 0
rosas = 0
Play: Sprite = None
ultima_direccion = ""
nena: Sprite = None
vida_enemigo = None
enemigo3 = None
ultima_direccion = "down"
scene.set_background_image(assets.image("""
    fondo_inicio0
    """))
sceneStart()

def on_update_interval():
    if nena and nivel == 1:
        crear_enemigo_tiktok()
game.on_update_interval(4000, on_update_interval)
