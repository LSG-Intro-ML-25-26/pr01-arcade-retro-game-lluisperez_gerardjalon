@namespace
class SpriteKind:
    menuItem = SpriteKind.create()
    cursor = SpriteKind.create()
    vacio = SpriteKind.create()
    Rose = SpriteKind.create()

def on_on_overlap(player2, rose):
    global rosa_actual
    if not rosa_actual:
        rosa_actual = rose
sprites.on_overlap(SpriteKind.player, SpriteKind.Rose, on_on_overlap)

def sceneStart():
    global Play
    Play = sprites.create(assets.image("""
            fondo_inicio0
            """),
        SpriteKind.vacio)
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

def on_on_destroyed(enemigo2):
    if enemigos.index_of(enemigo2) >= 0:
        j = enemigos.index_of(enemigo2)
        sprites.destroy(barras_enemigo[j])
        barras_enemigo.remove_at(j)
        enemigos.remove_at(j)
sprites.on_destroyed(SpriteKind.enemy, on_on_destroyed)

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
    music.play(music.create_sound_effect(WaveShape.TRIANGLE,
            4342,
            4246,
            232,
            0,
            106,
            SoundExpressionEffect.NONE,
            InterpolationCurve.CURVE),
        music.PlaybackMode.UNTIL_DONE)
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

def on_update():
    global rosa_actual
    if rosa_actual and nena:
        if not nena.overlaps_with(rosa_actual):
            rosa_actual = None
game.on_update(on_update)

def on_b_pressed():
    global rosa_actual, rosas
    if not (nena) or not (rosa_actual):
        return

    if not (nena.overlaps_with(rosa_actual)):
        rosa_actual = None
        return

    rosa_actual.set_kind(SpriteKind.vacio)
    sprites.destroy(rosa_actual, effects.none, 0)
    rosa_actual = None

    rosas += 1
    music.play(music.melody_playable(music.ba_ding),
        music.PlaybackMode.UNTIL_DONE)

    if rosas == 1:
        poner_hud(assets.image("""
            hud_rosas0
            """))
    elif rosas == 2:
        poner_hud(assets.image("""
            hud_rosas1
            """))
    elif rosas == 3:
        poner_hud(assets.image("""
            hud_rosas2
            """))
        game.show_long_text("Les tres roses s'uneixen. El temps s'atura. ",
            DialogLayout.BOTTOM)
        pause(2000)
        scenefour()
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def scenethree():
    scene.set_background_image(assets.image("""
        fondo_3am1
        """))
    game.show_long_text("La pantalla s'estira. El soroll canvia. El temps s'atura. Notes el cos pesat. Com si caiguessis… cap endins.",
        DialogLayout.BOTTOM)
    iniciar_nivel_1()

def on_on_overlap2(bala, enemigo):
    global muertes_n2
    sprites.destroy(bala)
    if enemigos.index_of(enemigo) >= 0:
        i = enemigos.index_of(enemigo)
        barras_enemigo[i].value += -10
        if barras_enemigo[i].value <= 0:
            sprites.destroy(enemigo)

            if nivel == 2:
                muertes_n2 += 1
                if muertes_n2 >= objetivo_n2:
                    game.show_long_text("Has derrotat 15 ombres de YouTube. La planta tremola... i la porta s'obre.",
                        DialogLayout.BOTTOM)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap2)


def scenefour():
    global rosa_hud, rosa_actual, fondo_transicion, en_transicion
    en_transicion = True

    music.stop_all_sounds()

    if rosa_hud:
        sprites.destroy(rosa_hud)
        rosa_hud = None
    rosa_actual = None

    if nena:
        controller.move_sprite(nena, 0, 0)
        nena.set_flag(SpriteFlag.INVISIBLE, True)

    sprites.destroy_all_sprites_of_kind(SpriteKind.enemy)
    sprites.destroy_all_sprites_of_kind(SpriteKind.projectile)

    scene.camera_follow_sprite(None)
    scene.center_camera_at(80, 60)

    fondo_transicion = sprites.create(assets.image("""
        fondo_rosas
        """), SpriteKind.vacio)
    fondo_transicion.set_position(80, 60)
    fondo_transicion.z = 1000
    fondo_transicion.start_effect(effects.cool_radial, 500)

    game.show_long_text("Les tres roses bateguen alhora. La pantalla s'obre… i caus a la planta següent.",
        DialogLayout.BOTTOM)

    pause(1200)

    sprites.destroy(fondo_transicion)
    iniciar_nivel_2()

    en_transicion = False

def scenetwo():
    scene.set_background_image(assets.image("""
        fondo_3am0
        """))
    game.show_long_text("El mòbil vibra. No és una notificació. Intentes bloquejar-lo. El botó no respon. Només un més. Aquesta vegada no ho decideixes tu.",
        DialogLayout.BOTTOM)
    scenethree()
def iniciar_nivel_1():
    global nivel, rosas, rosa_actual, nena, vida_jugador
    sprites.destroy_all_sprites_of_kind(SpriteKind.Rose)
    rosa_actual = None
    music.play(music.create_song(hex("""
            0078000408020405001c000f0a006400f4010a00000400000000000000000000000000000000021e0000000400021d2a1c0020000220252c003000031e242c34003800031e242c06001c00010a006400f40164000004000000000000000000000000000000000207000c001000021e2507001c00020a006400f40164000004000000000000000000000000000000000313000000040001271000140002242a20002400012a09010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c800360000000100010508000900020407140015000204091c001d00010b20002100020206280029000204083000310001093800390003000409
            """)),
        music.PlaybackMode.LOOPING_IN_BACKGROUND)
    nivel = 1
    rosas = 0
    tiles.set_current_tilemap(tilemap("""
        nivel1
        """))
    nena = sprites.create(assets.image("""
        nena-front
        """), SpriteKind.player)
    nena.set_position(40, 470)
    controller.move_sprite(nena, 100, 100)
    scene.camera_follow_sprite(nena)
    vida_jugador = statusbars.create(20, 2, StatusBarKind.health)
    vida_jugador.attach_to_sprite(nena)
    poner_hud(assets.image("""
        hud_rosas
        """))
    for index in range(3):
        r = sprites.create(assets.image("""
            rose
            """), SpriteKind.Rose)
        tiles.place_on_random_tile(r, assets.tile("""
            miMosaico
            """))

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
    global enemigo22, vida_enemigo2
    enemigo22 = sprites.create(assets.image("""
        tiktok
        """), SpriteKind.enemy)
    enemigo22.set_position(nena.x + randint(-60, 60), nena.y + randint(-60, 60))
    vida_enemigo2 = statusbars.create(20, 2, StatusBarKind.enemy_health)
    vida_enemigo2.max = 20
    vida_enemigo2.value = 20
    vida_enemigo2.attach_to_sprite(enemigo22)
    enemigo22.follow(nena, 20)
    enemigos.append(enemigo22)
    barras_enemigo.append(vida_enemigo2)
def poner_hud(img2: Image):
    global rosa_hud
    if rosa_hud:
        sprites.destroy(rosa_hud)
    rosa_hud = sprites.create(img2, SpriteKind.vacio)
    rosa_hud.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
    rosa_hud.z = 200
def iniciar_nivel_2():
    global nivel, nena, vida_jugador, muertes_n2
    music.play(music.create_song(assets.song("""
            nivel2
            """)),
        music.PlaybackMode.LOOPING_IN_BACKGROUND)
    nivel = 2
    muertes_n2 = 0
    tiles.set_current_tilemap(tilemap("""
        nivel2
        """))
    nena = sprites.create(assets.image("""
        nena-front
        """), SpriteKind.player)
    nena.set_position(40, 470)
    controller.move_sprite(nena, 100, 100)
    scene.camera_follow_sprite(nena)
    vida_jugador = statusbars.create(20, 2, StatusBarKind.health)
    vida_jugador.attach_to_sprite(nena)
    
def sceneOne():
    scene.set_background_image(assets.image("""
        fondo_3am
        """))
    game.show_long_text("Son les 3:33 AM. El mòbil vibra una altra vegada. No recordes quan has obert TikTok… però tampoc quan l'has deixat.",
        DialogLayout.BOTTOM)
    scenetwo()
def crear_enemigo_youtube():
    global enemigo22, vida_enemigo2
    enemigo22 = sprites.create(assets.image("""
        youtubre
        """), SpriteKind.enemy)
    enemigo22.set_position(nena.x + randint(-60, 60), nena.y + randint(-60, 60))
    vida_enemigo2 = statusbars.create(20, 2, StatusBarKind.enemy_health)
    vida_enemigo2.max = 30
    vida_enemigo2.value = 30
    vida_enemigo2.attach_to_sprite(enemigo22)
    enemigo22.follow(nena, 20)
    enemigos.append(enemigo22)
    barras_enemigo.append(vida_enemigo2)
vida_enemigo2: StatusBarSprite = None
enemigo22: Sprite = None
vida_jugador: StatusBarSprite = None
nivel = 0
fondo_transicion: Sprite = None
rosas = 0
barras_enemigo: List[StatusBarSprite] = []
enemigos: List[Sprite] = []
Play: Sprite = None
ultima_direccion = ""
rosa_hud: Sprite = None
rosa_actual: Sprite = None
rosa = None
nena: Sprite = None
vida_enemigo = None
enemigo3 = None
en_transicion = False
muertes_n2 = 0
objetivo_n2 = 15

ultima_direccion = "down"
scene.set_background_image(assets.image("""
    fondo_inicio1
    """))
sceneStart()

def on_update_interval():
    if en_transicion:
        return
    if nena and nivel == 1:
        crear_enemigo_tiktok()
    elif nena and nivel == 2:
        crear_enemigo_youtube()
game.on_update_interval(4000, on_update_interval)

game.on_update_interval(4000, on_update_interval)
