@namespace
class SpriteKind:
    menuItem = SpriteKind.create()
    cursor = SpriteKind.create()
    vacio = SpriteKind.create()
    Rose = SpriteKind.create()
    bossBullet = SpriteKind.create()
@namespace
class StatusBarKind:
    boss_health = StatusBarKind.create()

def on_on_overlap(player2, rose):
    global rosa_actual
    rosa_actual = rose
sprites.on_overlap(SpriteKind.player, SpriteKind.Rose, on_on_overlap)

def iniciar_nivel_3():
    global vida_jugador, nivel, nena
    sprites.destroy_all_sprites_of_kind(SpriteKind.enemy)
    sprites.destroy_all_sprites_of_kind(SpriteKind.projectile)
    if vida_jugador:
        sprites.destroy(vida_jugador)
        vida_jugador = None
    music.play(music.create_song(assets.song("""
            cancion_boss
            """)),
        music.PlaybackMode.LOOPING_IN_BACKGROUND)
    nivel = 3
    tiles.set_current_tilemap(tilemap("""
        nivel4
        """))
    nena = sprites.create(assets.image("""
        nena-front
        """), SpriteKind.player)
    nena.set_position(40, 470)
    controller.move_sprite(nena, 100, 100)
    scene.camera_follow_sprite(nena)
    vida_jugador = statusbars.create(20, 2, StatusBarKind.health)
    vida_jugador.attach_to_sprite(nena)
    crear_elon()
def signo(n: number):
    return 1 if n > 0 else (-1 if n < 0 else 0)
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
def torreta_dispara():
    global dx, dy, sx, sy, bala3
    if not (elon) or not (nena):
        return
    dx = nena.x - elon.x
    dy = nena.y - elon.y
    sx = signo(dx)
    sy = signo(dy)
    if abs(dx) < 10:
        sx = 0
    if abs(dy) < 10:
        sy = 0
    bala3 = sprites.create_projectile_from_sprite(assets.image("""
            elon-bullet
            """),
        elon,
        sx * 80,
        sy * 80)
    bala3.set_kind(SpriteKind.bossBullet)
    animation.run_image_animation(bala3,
        assets.animation("""
            elon-bullet-a
            """),
        100,
        True)
    bala3.lifespan = 2000

def on_on_overlap2(jugador, bala):
    global invulnerable_boss
    if invulnerable_boss:
        return
    invulnerable_boss = True
    sprites.destroy(bala)
    vida_jugador.value -= 20
    jugador.start_effect(effects.fire, 200)
    jugador.set_flag(SpriteFlag.GHOST, True)
    pause(400)
    jugador.set_flag(SpriteFlag.GHOST, False)
    invulnerable_boss = False
sprites.on_overlap(SpriteKind.player, SpriteKind.bossBullet, on_on_overlap2)

def on_on_overlap3(player22, enemy):
    global invulnerable
    if invulnerable:
        return
    invulnerable = True
    vida_jugador.value -= 10
    player22.start_effect(effects.spray, 200)
    player22.set_flag(SpriteFlag.GHOST, True)
    pause(400)
    player22.set_flag(SpriteFlag.GHOST, False)
    invulnerable = False
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap3)

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

def on_on_zero(barra):
    global s, elon
    s = barra.sprite_attached_to()
    if s:
        sprites.destroy(s)
    elon = None
    sprites.destroy_all_sprites_of_kind(SpriteKind.bossBullet)
statusbars.on_zero(StatusBarKind.boss_health, on_on_zero)

def on_right_pressed():
    global ultima_direccion
    if nena:
        ultima_direccion = "right"
        animation.run_image_animation(nena,
            assets.animation("""
                nena-animation-left0
                """),
            500,
            False)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_on_destroyed(enemigo2):
    j = enemigos.index_of(enemigo2)
    if j < 0:
        return
    if j >= 0 and j < len(barras_enemigo):
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

def on_b_pressed():
    global rosa_actual, rosas
    if not (nena) or not (rosa_actual):
        return
    if not (nena.overlaps_with(rosa_actual)):
        rosa_actual = None
        return
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
        game.show_long_text("Has aconseguit les tres roses.", DialogLayout.BOTTOM)
        pause(2000)
        scenefour()
    else:
        pass
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def sceneWin():
    global en_transicion, rosa_hud, vida_jugador, nena, win
    en_transicion = True
    music.stop_all_sounds()
    sprites.destroy_all_sprites_of_kind(SpriteKind.enemy)
    sprites.destroy_all_sprites_of_kind(SpriteKind.projectile)
    sprites.destroy_all_sprites_of_kind(SpriteKind.bossBullet)
    if rosa_hud:
        sprites.destroy(rosa_hud)
        rosa_hud = None
    if vida_jugador:
        sprites.destroy(vida_jugador)
        vida_jugador = None
    if nena:
        controller.move_sprite(nena, 0, 0)
        sprites.destroy(nena)
        nena = None
    tiles.set_current_tilemap(tilemap("""
        nivel_vacio
        """))
    scene.camera_follow_sprite(None)
    scene.center_camera_at(80, 60)
    win = sprites.create(assets.image("""
        fondo_7am
        """), SpriteKind.vacio)
    win.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
    win.set_position(80, 60)
    win.z = 9999
    game.show_long_text("Són les 7:00 AM. Tot era un mal somni", DialogLayout.BOTTOM)
    pause(800)
    game.over(True, effects.confetti)
def scenethree():
    scene.set_background_image(assets.image("""
        fondo_3am1
        """))
    game.show_long_text("La pantalla s'estira. El soroll canvia. El temps s'atura. Notes el cos pesat. Com si caiguessis… cap endins.",
        DialogLayout.BOTTOM)
    iniciar_nivel_1()

def on_on_overlap4(bala2, enemigo):
    global es_elon, i, barra22, muertes_n2, elon
    sprites.destroy(bala2)
    es_elon = enemigo == elon
    if enemigos.index_of(enemigo) < 0:
        return
    i = enemigos.index_of(enemigo)
    barra22 = barras_enemigo[i]
    barra22.value -= 10
    if barra22.value > 0:
        return
    sprites.destroy(enemigo)
    if nivel == 2:
        muertes_n2 += 1
        if muertes_n2 >= objetivo_n2:
            scenefive()
    if es_elon:
        elon = None
        sprites.destroy_all_sprites_of_kind(SpriteKind.bossBullet)
        sceneWin()
        return
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap4)

def scenefour():
    global rosa_hud, rosa_actual, fondo_transicion
    music.stop_all_sounds()
    if rosa_hud:
        sprites.destroy(rosa_hud)
        rosa_hud = None
    rosa_actual = None
    scene.camera_follow_sprite(None)
    scene.center_camera_at(80, 60)
    fondo_transicion = sprites.create(assets.image("""
        fondo_rosas
        """), SpriteKind.vacio)
    fondo_transicion.start_effect(effects.cool_radial, 500)
    fondo_transicion.set_position(80, 60)
    fondo_transicion.z = 1000
    game.show_long_text("Amb totes les donacions obtenides, s'obre una escalera a la següent planta.",
        DialogLayout.BOTTOM)
    pause(2000)
    sprites.destroy(fondo_transicion)
    iniciar_nivel_2()
def scenetwo():
    scene.set_background_image(assets.image("""
        fondo_3am0
        """))
    game.show_long_text("El mòbil vibra. No és una notificació. Intentes bloquejar-lo. El botó no respon. Només un més. Aquesta vegada no ho decideixes tu.",
        DialogLayout.BOTTOM)
    scenethree()
def crear_elon():
    global elon, vida_enemigo2
    elon = sprites.create(assets.image("""
        elon-front
        """), SpriteKind.enemy)
    vida_enemigo2 = statusbars.create(20, 4, StatusBarKind.boss_health)
    vida_enemigo2.max = 100
    vida_enemigo2.value = 100
    vida_enemigo2.attach_to_sprite(elon)
    enemigos.append(elon)
    barras_enemigo.append(vida_enemigo2)
    elon.vx = 0
    elon.vy = 0
    elon.ax = 0
    elon.ay = 0
    tiles.place_on_random_tile(elon, sprites.dungeon.collectible_insignia)
def iniciar_nivel_1():
    global nivel, rosas, rosa_actual, nena, vida_jugador
    music.play(music.create_song(hex("""
            0078000408020405001c000f0a006400f4010a00000400000000000000000000000000000000021e0000000400021d2a1c0020000220252c003000031e242c34003800031e242c06001c00010a006400f40164000004000000000000000000000000000000000207000c001000021e2507001c00020a006400f40164000004000000000000000000000000000000000313000000040001271000140002242a20002400012a09010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c800360000000100010508000900020407140015000204091c001d00010b20002100020206280029000204083000310001093800390003000409
            """)),
        music.PlaybackMode.LOOPING_IN_BACKGROUND)
    nivel = 1
    rosas = 0
    rosa_actual = None
    tiles.set_current_tilemap(tilemap("""
        nivel0
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
        t = sprites.create(assets.image("""
            rose
            """), SpriteKind.Rose)
        tiles.place_on_random_tile(t, assets.tile("""
            miMosaico
            """))

def on_up_pressed():
    global ultima_direccion
    if nena:
        ultima_direccion = "up"
        animation.run_image_animation(nena,
            assets.animation("""
                nena-animation-down0
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
    enemigo22.follow(nena, 25)
    enemigos.append(enemigo22)
    barras_enemigo.append(vida_enemigo2)

def on_on_zero2(barra2):
    if nena:
        controller.move_sprite(nena, 0, 0)
        nena.start_effect(effects.disintegrate, 500)
    music.stop_all_sounds()
    pause(600)
    game.over(False, effects.melt)
statusbars.on_zero(StatusBarKind.health, on_on_zero2)

def poner_hud(img2: Image):
    global rosa_hud
    if rosa_hud:
        sprites.destroy(rosa_hud)
    rosa_hud = sprites.create(img2, SpriteKind.vacio)
    rosa_hud.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
    rosa_hud.z = 200
def iniciar_nivel_2():
    global vida_jugador, muertes_n2, objetivo_n2, nivel
    if vida_jugador:
        sprites.destroy(vida_jugador)
        vida_jugador = None
    sprites.destroy_all_sprites_of_kind(SpriteKind.enemy)
    sprites.destroy_all_sprites_of_kind(SpriteKind.projectile)
    muertes_n2 = 0
    objetivo_n2 = 10
    music.play(music.create_song(assets.song("""
            nivel2
            """)),
        music.PlaybackMode.LOOPING_IN_BACKGROUND)
    nivel = 2
    tiles.set_current_tilemap(tilemap("""
        nivel2
        """))
    nena.set_position(40, 470)
    controller.move_sprite(nena, 100, 100)
    scene.camera_follow_sprite(nena)
    vida_jugador = statusbars.create(20, 2, StatusBarKind.health)
    vida_jugador.attach_to_sprite(nena)
def scenefive():
    global en_transicion, rosa_actual, rosa_hud, fondo_transicion
    en_transicion = True
    sprites.destroy_all_sprites_of_kind(SpriteKind.enemy)
    sprites.destroy_all_sprites_of_kind(SpriteKind.projectile)
    music.stop_all_sounds()
    rosa_actual = None
    if rosa_hud:
        sprites.destroy(rosa_hud)
        rosa_hud = None
    if nena:
        controller.move_sprite(nena, 0, 0)
        nena.set_flag(SpriteFlag.INVISIBLE, True)
    sprites.destroy_all_sprites_of_kind(SpriteKind.enemy)
    sprites.destroy_all_sprites_of_kind(SpriteKind.projectile)
    scene.camera_follow_sprite(None)
    scene.center_camera_at(80, 60)
    fondo_transicion = sprites.create(img("""
            dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbbbb
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbbb
            dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbb
            dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbb
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbddbbbbddbbddbbddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbb
            dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbcccbbbccccbbcccccccbbdddddbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbb
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbccccccccccccfffffffffcbbbbbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddb
            dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbdddbcccccccffffcffffffffffffcbbbbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbb
            dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbcccbbbcfccffffffffcffffffffffffccbbbbcbddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbb
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbfccccccffffffffffcccffccfffccfffcbbbbbbbddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbfcccfccffcfffffccccccccccfccccccccccbbcbddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddddddddcbbfccffcfffffffffccccccccccfcccccccccccccbbbddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddddbfcbcfffffffccfffffccccccfccccfccccccccccccbbdbdddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddddcfcbccffffffffffffffcccfffcfccfcfcccfccccccbdbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddddddbffccfcfffffccffffffffffffffffcffffffffcfccfcbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddddbbcffffffcccfcccffffffffffffffffffffffffffffffcbbbbddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddbcccffffffccfffffffffcfffffffffffffffffffffffffcbbbbbccbbbbdddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddcccfffffffcffffffffffccffffffffffffffffffffffffccccccccccbbdddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddbccfffffffffffffffffffffffcccccccccffffffffffffffccccccccbbdddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddbcfffffffffffffffcccccccccceeeeeeccccccfffffffffffcccccccbbbddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddbccffffffffffffcccccceeeeeebbbbbbbbbbbbeecffffffffffffcccccbbddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddbcffffffffffffcceeeeebbbbbbbddddddddddddbbeefffffffcccccccccbbddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddbddbcffffffffffffceeebbbbbbdddddddddddddddddddbbcfffffffcccccccccbddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddbbbccffffffffffffceebbbbbddddddddddddddddddddddddbcfffffffccccccccbddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddbccccffffffffffceebbbbbdddddddddddddddddddddddddbecffffcccccccccbbddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddbccfffffffffceebbbbbdddddddddddddddddddddddddddbeffffccccfffffcbddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddcfffffffffceebbbbddddddddddddddddddddddddddddddbcffccfccfffffcbddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddbcccfffffffeeebbbbddddddddddddddddddddddddddddddbccffffffffcfccbddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddbcccfffffffceebbbbdddddddddddddddddddddddddddddddbecfffffffcccccbddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddbbcfffffffceebbbbdddddddddddddddddddddddddddddddbbccfffcffffccbbddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddbcfffffceeebbbbddddddddddddddddddddddddddddddddbccffffffffcbbdddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddbcfffffceeebbbbbddddddddddddddddddddddddddddddbbbccffffffffcbdddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddbcfffffeeebbbbbbddddddddddddddddddddddddddddddbbbccffffffffcbdddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddbfffffceeebbbbbbddddddddddddddddddddddddddddddbbeccffffffffcbdddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddbcffffceeebbbbbbddddddddddddddddddddddddddddddbbeecffffffffcbdddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddbcffffceebbbbbbbdddddddddddddddddddddddddddddddbeeccffffffcbddddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddcfffceeebbbbbbbdddddddddddddddddddddddddddddddbecffffffffcbddddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddbcffceeebbbbbbbddddddddddddddd1d11dddddddddddddbecfffffffcbddddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddbcffceeebbbbbbdddddddddddddddd11111dddddddddddddbeccffffcbdddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddcffeeeebbbbbbdddddddddddddddd111111dddddddddddddeecffffcbdddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddcffeeeebbbbbdddddddddddddddddddddddbddddddddddddeecffffcddddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddcffeeeeebebbbbbdddddddddddddddbbbbebddddddddddddbecccffbddddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddcffeeeeeeeeeeebbbdddddddddddbeeeeebbbbbdddddddddbeeefccbddddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddcffeeeeeeeeeeeeebbbddddddddbbbbbbbbbbbbdbdddddddbecefccbddddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddbcfeeeeeeeebbbbbeebbdddddddbbbbdddddddddddddddddbececccbddddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddbcfeeeeeeebbbdddbeebbddddddbbbbbbdddddddddddddddbececcccddddddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddddcfeeeeeeebbbbddbbeebdd1dddbbbeeebebbdddddddddddbeceeeebddddddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddddcfeeeeeeeeeccbbeeeeedd11dbbeebbcccbebbdddddddddbecbbebbddddddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddddcfceeeeeccccccbbeeeebd11ddbbbbbbbbdbbbdddddddddbeebbbbdddddddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddddbcceeeeeeebbbbdbbbeebddddddbbbdddddddddddddddddbeeeddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddddbeceeeeeebbbbddddbeebddddddbbbbdddddddddddddddbbccbddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddddbcceeebbbbbbbbbbbbeebdddddddbbbbbddddddddddddbbbecbddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddddbcceeebbbbbbbbbbbbbebdddddd1dddddddddddddddddbbbeebddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddcceeebbbbbbbbddbbbebdddddd111dddddddddddddddbbeebbddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddbceeebbbbbbbdddbbbebddddddddddddddddddddddddbbeeddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddddddceeeebbbbbddddbbeebddddddddddddddddddddddddbbebddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddddddceeeebbbbddddbbbeebddddddddddddddddddddddddbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddddeeeebbbbddddbbeeebddddddddddddddddddddddddbbbddddbddddddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddddeeeebbbbddddbbeeebdddddddddddddddddddddddddbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddddeeeebbbdddddbbeeebdddddddddddddddddddddddddbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddddbeeebbbddddbbbeeebbddbbbddddbddddddddddddddbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddddbeeebbbbbdbbbbeccebbbbebbddddbdddddddddddddbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddddbeeebbbbbdbbbbeeceebbbbbbddddbbbdddddddddddbb1ddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddddbeeeebbbbbbbbbeeeceebdddddddddbbbdddddbddddbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddddbeeeeebbbbbbbbbbeebbbddddddddddbbbbbbbdddddbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddddbeeeeebbbbbbbbbbbbbddddddddddddddbbbdddddddbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddddddddeeeeeebbbbbbbbbbbdddddddddddddddddddddddddbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddddddddeeeeeebbbbbebbbbbdddddddddddddddddddddddddbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddddddddeeeeeebbbbeebbbbbbbdbbbbdddddbdddddddddddbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddddddddeeeeeebbbeeeeeeeeeeebbbeeeebbbbdddddddddbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddddddddbeeeeebbbbecfcccbbbbddbbbbbbbdbbdddddddbbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddeeeeebbbbeeccceebbbdbbddbbddddddddddddbbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddeeeeebbdbbeeeebbbbb3ddddddd11ddddddddbbbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbeeeeebdbbeeeeebbbbbddddddd11ddddddddbbbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddeeeeeebbbbeeeebbbbbbbddddd1ddddddddbbbbbbbbddbdddddddddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbeeeeebbbbeeeebbbbbbbddddddddddddddbbbbbbbbbdcbddddddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbeeeeebbbbbeebbbbbbddddddddddddddbbbbbbddbedbcbdddddddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddceeeeebbbbbbbbbbddddddddddddddddbbbbbddddc1dccdddddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbeeeebbbbbbbbdddddddddddddddddbbbbbddddde1dfcbddddddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddceeeebbbbbbbddddddddddddddddbbbbbdddddbe1dfffbdddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbceeeeebbbbbbdddddddddddddbbbbbbbddddddbb1dfcffbddddddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddccceeeebbbbbbdddddddddddbbbbbbbbdddddddb11dccfffbdddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddcfcceeeeeebbbbbdbbddddddbbbbbbbbdddddddbd11dccffffbddddddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbcffcccceeeebbbbbbbbbbbbbbbbbbbbbddddddddb111dcccffffcbddddddddddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbffffcbccceeeeeebbbbbbbbbbbbbbbbbddddddddbd111dfccffffffbdddddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddddbbcffffffcbbcccceecccebbbbbbbeebbbbbdddddddddbd1111dfcccffffffcbbddddddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddddbccffffffffcbbbccceeeeeeeebbeebbbebbbddddddddddd11111dfccccfffffffccbbbddddddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddddbcfffffffffffcbdbbcceeeeeeeeebbbbbbbbbddddddddddbd11111dccccccffcfffcccccccbdddddddddddddddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddddddddddddddccfffffffffffffcdddbceeeeeeeeeebbbbbbbdddddddddddbd111111bccccccccccffccccccccccbddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddbccfffffffffffffffcddddbeeeeeeeeeebbbbbbdddddddddddbd1111111bccccccccccffcccccccccccccddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddcccfffffffffffffffffcdddddeebbbbbbbbbbbbbddddddddddddd1111111dcccccccccccfffccccccccccccccbdddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddccffffffffffffffffffffcdd11dbbbbbbbbbbbbbbdddddddddddddd1111111dccccccccccccffccccccccccccccccbdddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddcfffffffffffffffffffffffcdd111dbbbbbbbbbbbbbbddddddddddbd11111111dccccccccccccffccccccccccccccccccbdddddddddddddddddddddd
            dddddddddddddddddddddddddddddddddddbcfffffffffffffffffffffffffcd11ddd1ddbbbbbbbbbbddddddddddbd111111111dccccccccccccffccccccccccccccccccccbdddddddddddddddddddd
            dddddddddddddddddddddddddddddddddcffffffffffffffffffffffffffffcddbbdddddd1dbbbbbbbbbbdddddddd1111111111dccccccccccccffccccccccccccccccccccccbdddddddddddddddddd
            ddddddddddddddddddddddddddddddbcffffffffffffffffffffffffffffffcddbbddddddddddbbbbbbbbbbbddd1111d1111111dccccccccccccffcccccccccccccccccccccccbddddddddddddddddd
            ddddddddddddddddddddddddddddbfffffffffffffffffffffffffffffffffbdbdddddddddd1dddbbbbbbbbddd11111ddd11111bccccccccccccfcccccccccccccccccccccccccfbbdddddddddddddd
            ddddddddddddddddddddddddbbbffffffffffffffffffffffffffffffffffcdddddddd1ddddddddddbbbbbbdd111111dddd1111bccccccccccccfcccccccccccccccccccccccccccccbbddddddddddd
            ddddddddddddddddddddddbcfffffffffffffffffffffffffffffffffffffcdddddddddddddddddddddbbbbd1111111dddd1111bccccccccccccfcccccccccccccccccccccccccccccccbbddddddddd
            dddddddddddddddddddbbcfffffffffffffffffffffffffffffffffffffffc11dd11ddddd111dddddddddbbd1111111ddddd111cccccccccccccfcccccccccccccccccccccccccccccccccbbddddddd
            ddddddddddddddddddbcfffffffffffffffffffffffffffffffffffffffffc11111111ddd11ddddddddddbbd11111111dddd11dcccccccccccccfcfcccccccccccccccccccccccccccccccccbbddddd
            dddddddddddddddddbcffffffffffffffffffffffffffffffffffffffffffc111111111dd1dddddddddddddd111111111dddd1dcccccccccccccccfccccccccccccccccccccccccccccccccccccbddd
            dddddddddddddddddcfffffffffffffffffffffffffffffffffffffffffffc111111111dddddddddddddddddd111111111ddd1dcccccccccccccfcfcccccccccccccccccccccccccccccccccccccddd
            ddddddddddddddddbffffffffffffffffffffffffffffffffffffffffffffc1111111111dd1ddddddddddddddd1111111111d1dcccccccccccccfccccccccccccccccccccccccccccccccccccccfbdd
            ddddddddddddddddcfffffffffffffffffffffffffffffffffffffffffffcc11111111111dd1dddddddddddbbbd1111111111dbccccccccccccccccccccccccccccccccccccccccccccccccccccfcdd
            ddddddddddddddddffffffffffffffffffffffffffffffffffffffffffffccd1111111111ddd1ddddddddddbbbb1111111111dccccccccccccccccccccccccccccccccccccccccccccccccccccfffdd
            ddddddddddddddddffffffffffffffffffffffffffffffffffffffffffffccd11111111111dddddddddddddbbbd11111111111ccccccccccccccccccccccccccccccccccccccccccccccccffccfffdd
            ddddddddddddddddffffffffffffffffffffffffffffffffffffffffffffccd11111111111ddd11ddddddddbbd11111111111dccccccccccccccccccccccccccccccccccccccccccccccccffccfffbd
            dddddddddddddddbffffffffffffffffffffffffffffffffffffffffffffcc1111111111111dddddddddddddd111111111111bccccccccccccccccccccccccccccccccccccccccccccccccfccffffbd
            dddddddddddddddbffffffffffffffffffffffffffffffffffffffffffffcb11111111111111dd1ddddddddd1111111111111dcccccccccccccccccccccccccccccccccccccccccccccccffccffffcd
            dddddddddddddddcffffffffffffffffffffffffffffffffffffffffffffcb111111111111111dddddddddd11111111111111bcccccccccccccccccccccccccccccccccccccccccccccccffccffffcd
            dddddddddddddddcffffffffffffffffffffffffffffffffffffffffffffcb111111111111111ddddddddd111111111111111cccccccccccccccccccccccccccccccccccccccccccccccfffcffffffd
            dddddddddddddddcffffffffffffffffffffffffffffffffffffffffffffcd1111111111111111ddddddd1111111111111111cccccccccccccccccccccccccccccccccccccccccccccccffccffffffd
            dddddddddddddddffffffffffffffffffffffffffffffffffffffffffffccd11111111111111111ddddd11111111111111111ccccccccccccccccccccccccccccccccccccccccccccccfffccffffffd
            dddddddddddddddffffffffffffffffffffffffffffffffffffffffffffccd111111111111111111dd111111111111111111dccccccccccccccccccccccccccccccccccccccccccccccffcccffffffb
            dddddddddddddddffffffffffffffffffffffffffffffffffffffffffffcc111111111111111111111111111111111111111dccccccccccccccccccccccccccccccccccccccccccccccffcccffffffb
            dddddddddddddddffffffffffffffffffffffffffffffffffffffffffffcc111111111111111111111111111111111111111bcccccccccccccccccccccccccccccccccccccccccccccfffccfffffffb
            ddddddddddddddbffffffffffffffffffffffffffffffffffffffffffffcc111111111111111111111111111111111111111cccccccccccccccccccccccccccccccccccccccccccccffffccfffffffb
            ddddddddddddddbffffffffffffffffffffffffffffffffffffffffffffcc111111111111111111111111111111111111111ccccccccccccccccccccccccccccccccccccccccccccccffccffffffffc
            ddddddddddddddbffffffffffffffffffffffffffffffffffffffffffffcc111111111111111111111111111111111111111cccccccccccccccccccccccccccccccccccccccccccccfffccfffffffff
            """),
        SpriteKind.vacio)
    fondo_transicion.set_position(80, 60)
    fondo_transicion.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
    fondo_transicion.set_flag(SpriteFlag.GHOST, True)
    fondo_transicion.z = 2000
    fondo_transicion.start_effect(effects.cool_radial, 500)
    game.show_long_text("El veus al final de la habitació... t'està esperant.",
        DialogLayout.BOTTOM)
    pause(1200)
    sprites.destroy(fondo_transicion)
    iniciar_nivel_3()
    en_transicion = False
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
    enemigo22.follow(nena, 30)
    enemigos.append(enemigo22)
    barras_enemigo.append(vida_enemigo2)
enemigo22: Sprite = None
vida_enemigo2: StatusBarSprite = None
fondo_transicion: Sprite = None
objetivo_n2 = 0
muertes_n2 = 0
i = 0
es_elon = False
win: Sprite = None
en_transicion = False
rosas = 0
barras_enemigo: List[StatusBarSprite] = []
enemigos: List[Sprite] = []
s: Sprite = None
ultima_direccion = ""
invulnerable_boss = False
bala3: Sprite = None
sy = 0
sx = 0
dy = 0
dx = 0
Play: Sprite = None
nivel = 0
invulnerable = False
rosa_hud: Sprite = None
rosa_actual: Sprite = None
nena: Sprite = None
vida_jugador: StatusBarSprite = None
elon: Sprite = None
barra22: StatusBarSprite = None
invulnerable = False
scene.set_background_image(assets.image("""
    fondo_inicio1
    """))
sceneStart()

def on_update_interval():
    if en_transicion:
        return
    if nena and (elon and nivel == 3):
        torreta_dispara()
game.on_update_interval(1000, on_update_interval)

def on_update_interval2():
    if en_transicion:
        return
    if nena and nivel == 1:
        crear_enemigo_tiktok()
    elif nena and nivel == 2:
        crear_enemigo_youtube()
game.on_update_interval(4000, on_update_interval2)
