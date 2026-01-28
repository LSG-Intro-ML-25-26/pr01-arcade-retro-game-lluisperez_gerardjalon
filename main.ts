namespace SpriteKind {
    export const menuItem = SpriteKind.create()
    export const cursor = SpriteKind.create()
    export const vacio = SpriteKind.create()
    export const Rose = SpriteKind.create()
    export const bossBullet = SpriteKind.create()
}

namespace StatusBarKind {
    export const boss_health = StatusBarKind.create()
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.Rose, function on_on_overlap(player2: Sprite, rose: Sprite) {
    
    rosa_actual = rose
})
function iniciar_nivel_3() {
    
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    if (vida_jugador) {
        sprites.destroy(vida_jugador)
        vida_jugador = null
    }
    
    music.play(music.createSong(assets.song`
            cancion_boss
            `), music.PlaybackMode.LoopingInBackground)
    nivel = 3
    tiles.setCurrentTilemap(tilemap`
        nivel4
        `)
    nena = sprites.create(assets.image`
        nena-front
        `, SpriteKind.Player)
    nena.setPosition(40, 470)
    controller.moveSprite(nena, 100, 100)
    scene.cameraFollowSprite(nena)
    vida_jugador = statusbars.create(20, 2, StatusBarKind.Health)
    vida_jugador.attachToSprite(nena)
    crear_elon()
}

function signo(n: number): number {
    return n > 0 ? 1 : (n < 0 ? -1 : 0)
}

function sceneStart() {
    
    Play = sprites.create(assets.image`
            fondo_inicio0
            `, SpriteKind.vacio)
    while (!controller.A.isPressed()) {
        Play.setFlag(SpriteFlag.Invisible, true)
        pause(200)
        Play.setFlag(SpriteFlag.Invisible, false)
        pause(200)
    }
    Play.setFlag(SpriteFlag.Invisible, true)
    sceneOne()
}

function torreta_dispara() {
    
    if (!elon || !nena) {
        return
    }
    
    dx = nena.x - elon.x
    dy = nena.y - elon.y
    sx = signo(dx)
    sy = signo(dy)
    if (Math.abs(dx) < 10) {
        sx = 0
    }
    
    if (Math.abs(dy) < 10) {
        sy = 0
    }
    
    bala3 = sprites.createProjectileFromSprite(assets.image`
            elon-bullet
            `, elon, sx * 80, sy * 80)
    bala3.setKind(SpriteKind.bossBullet)
    animation.runImageAnimation(bala3, assets.animation`
            elon-bullet-a
            `, 100, true)
    bala3.lifespan = 2000
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.bossBullet, function on_on_overlap2(jugador: Sprite, bala: Sprite) {
    
    if (invulnerable_boss) {
        return
    }
    
    invulnerable_boss = true
    sprites.destroy(bala)
    vida_jugador.value -= 20
    jugador.startEffect(effects.fire, 200)
    jugador.setFlag(SpriteFlag.Ghost, true)
    pause(400)
    jugador.setFlag(SpriteFlag.Ghost, false)
    invulnerable_boss = false
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_on_overlap3(player22: Sprite, enemy: Sprite) {
    
    if (invulnerable) {
        return
    }
    
    invulnerable = true
    vida_jugador.value -= 10
    player22.startEffect(effects.spray, 200)
    player22.setFlag(SpriteFlag.Ghost, true)
    pause(400)
    player22.setFlag(SpriteFlag.Ghost, false)
    invulnerable = false
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function on_down_pressed() {
    
    if (nena) {
        ultima_direccion = "down"
        animation.runImageAnimation(nena, assets.animation`
                nena-animation-down
                `, 500, false)
    }
    
})
statusbars.onZero(StatusBarKind.boss_health, function on_on_zero(barra: StatusBarSprite) {
    
    s = barra.spriteAttachedTo()
    if (s) {
        sprites.destroy(s)
    }
    
    elon = null
    sprites.destroyAllSpritesOfKind(SpriteKind.bossBullet)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    
    if (nena) {
        ultima_direccion = "right"
        animation.runImageAnimation(nena, assets.animation`
                nena-animation-left0
                `, 500, false)
    }
    
})
sprites.onDestroyed(SpriteKind.Enemy, function on_on_destroyed(enemigo2: Sprite) {
    let j = enemigos.indexOf(enemigo2)
    if (j < 0) {
        return
    }
    
    if (j >= 0 && j < barras_enemigo.length) {
        sprites.destroy(barras_enemigo[j])
        barras_enemigo.removeAt(j)
    }
    
    enemigos.removeAt(j)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    
    if (nena) {
        ultima_direccion = "left"
        animation.runImageAnimation(nena, assets.animation`
                nena-animation-left
                `, 500, false)
    }
    
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    if (!nena) {
        return
    }
    
    music.play(music.createSoundEffect(WaveShape.Triangle, 4342, 4246, 232, 0, 106, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
    if (ultima_direccion == "right") {
        sprites.createProjectileFromSprite(assets.image`
            bullet-1
            `, nena, 150, 0)
    } else if (ultima_direccion == "left") {
        sprites.createProjectileFromSprite(assets.image`
            bullet-1
            `, nena, -150, 0)
    } else if (ultima_direccion == "up") {
        sprites.createProjectileFromSprite(assets.image`
            bullet-1
            `, nena, 0, -150)
    } else if (ultima_direccion == "down") {
        sprites.createProjectileFromSprite(assets.image`
            bullet-1
            `, nena, 0, 150)
    }
    
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
    
    if (!nena || !rosa_actual) {
        return
    }
    
    if (!nena.overlapsWith(rosa_actual)) {
        rosa_actual = null
        return
    }
    
    sprites.destroy(rosa_actual, effects.none, 0)
    rosa_actual = null
    rosas += 1
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    if (rosas == 1) {
        poner_hud(assets.image`
            hud_rosas0
            `)
    } else if (rosas == 2) {
        poner_hud(assets.image`
            hud_rosas1
            `)
    } else if (rosas == 3) {
        poner_hud(assets.image`
            hud_rosas2
            `)
        game.showLongText("Has aconseguit les tres roses.", DialogLayout.Bottom)
        pause(2000)
        scenefour()
    } else {
        
    }
    
})
function sceneWin() {
    
    en_transicion = true
    music.stopAllSounds()
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    sprites.destroyAllSpritesOfKind(SpriteKind.bossBullet)
    if (rosa_hud) {
        sprites.destroy(rosa_hud)
        rosa_hud = null
    }
    
    if (vida_jugador) {
        sprites.destroy(vida_jugador)
        vida_jugador = null
    }
    
    if (nena) {
        controller.moveSprite(nena, 0, 0)
        sprites.destroy(nena)
        nena = null
    }
    
    tiles.setCurrentTilemap(tilemap`
        nivel_vacio
        `)
    scene.cameraFollowSprite(null)
    scene.centerCameraAt(80, 60)
    win = sprites.create(assets.image`
        fondo_7am
        `, SpriteKind.vacio)
    win.setFlag(SpriteFlag.RelativeToCamera, true)
    win.setPosition(80, 60)
    win.z = 9999
    game.showLongText("Són les 7:00 AM. Tot era un mal somni", DialogLayout.Bottom)
    pause(800)
    game.over(true, effects.confetti)
}

function scenethree() {
    scene.setBackgroundImage(assets.image`
        fondo_3am1
        `)
    game.showLongText("La pantalla s'estira. El soroll canvia. El temps s'atura. Notes el cos pesat. Com si caiguessis… cap endins.", DialogLayout.Bottom)
    iniciar_nivel_1()
}

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_on_overlap4(bala2: Sprite, enemigo: Sprite) {
    
    sprites.destroy(bala2)
    es_elon = enemigo == elon
    if (enemigos.indexOf(enemigo) < 0) {
        return
    }
    
    i = enemigos.indexOf(enemigo)
    barra22 = barras_enemigo[i]
    barra22.value -= 10
    if (barra22.value > 0) {
        return
    }
    
    sprites.destroy(enemigo)
    if (nivel == 2) {
        muertes_n2 += 1
        if (muertes_n2 >= objetivo_n2) {
            scenefive()
        }
        
    }
    
    if (es_elon) {
        elon = null
        sprites.destroyAllSpritesOfKind(SpriteKind.bossBullet)
        sceneWin()
        return
    }
    
})
function scenefour() {
    
    music.stopAllSounds()
    if (rosa_hud) {
        sprites.destroy(rosa_hud)
        rosa_hud = null
    }
    
    rosa_actual = null
    scene.cameraFollowSprite(null)
    scene.centerCameraAt(80, 60)
    fondo_transicion = sprites.create(assets.image`
        fondo_rosas
        `, SpriteKind.vacio)
    fondo_transicion.startEffect(effects.coolRadial, 500)
    fondo_transicion.setPosition(80, 60)
    fondo_transicion.z = 1000
    game.showLongText("Amb totes les donacions obtenides, s'obre una escalera a la següent planta.", DialogLayout.Bottom)
    pause(2000)
    sprites.destroy(fondo_transicion)
    iniciar_nivel_2()
}

function scenetwo() {
    scene.setBackgroundImage(assets.image`
        fondo_3am0
        `)
    game.showLongText("El mòbil vibra. No és una notificació. Intentes bloquejar-lo. El botó no respon. Només un més. Aquesta vegada no ho decideixes tu.", DialogLayout.Bottom)
    scenethree()
}

function crear_elon() {
    
    elon = sprites.create(assets.image`
        elon-front
        `, SpriteKind.Enemy)
    vida_enemigo2 = statusbars.create(20, 4, StatusBarKind.boss_health)
    vida_enemigo2.max = 100
    vida_enemigo2.value = 100
    vida_enemigo2.attachToSprite(elon)
    enemigos.push(elon)
    barras_enemigo.push(vida_enemigo2)
    elon.vx = 0
    elon.vy = 0
    elon.ax = 0
    elon.ay = 0
    tiles.placeOnRandomTile(elon, sprites.dungeon.collectibleInsignia)
}

function iniciar_nivel_1() {
    let t: Sprite;
    
    music.play(music.createSong(hex`
            0078000408020405001c000f0a006400f4010a00000400000000000000000000000000000000021e0000000400021d2a1c0020000220252c003000031e242c34003800031e242c06001c00010a006400f40164000004000000000000000000000000000000000207000c001000021e2507001c00020a006400f40164000004000000000000000000000000000000000313000000040001271000140002242a20002400012a09010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c800360000000100010508000900020407140015000204091c001d00010b20002100020206280029000204083000310001093800390003000409
            `), music.PlaybackMode.LoopingInBackground)
    nivel = 1
    rosas = 0
    rosa_actual = null
    tiles.setCurrentTilemap(tilemap`
        nivel0
        `)
    nena = sprites.create(assets.image`
        nena-front
        `, SpriteKind.Player)
    nena.setPosition(40, 470)
    controller.moveSprite(nena, 100, 100)
    scene.cameraFollowSprite(nena)
    vida_jugador = statusbars.create(20, 2, StatusBarKind.Health)
    vida_jugador.attachToSprite(nena)
    poner_hud(assets.image`
        hud_rosas
        `)
    for (let index = 0; index < 3; index++) {
        t = sprites.create(assets.image`
            rose
            `, SpriteKind.Rose)
        tiles.placeOnRandomTile(t, assets.tile`
            miMosaico
            `)
    }
}

controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    
    if (nena) {
        ultima_direccion = "up"
        animation.runImageAnimation(nena, assets.animation`
                nena-animation-down0
                `, 500, false)
    }
    
})
function crear_enemigo_tiktok() {
    
    enemigo22 = sprites.create(assets.image`
        tiktok
        `, SpriteKind.Enemy)
    enemigo22.setPosition(nena.x + randint(-60, 60), nena.y + randint(-60, 60))
    vida_enemigo2 = statusbars.create(20, 2, StatusBarKind.EnemyHealth)
    vida_enemigo2.max = 20
    vida_enemigo2.value = 20
    vida_enemigo2.attachToSprite(enemigo22)
    enemigo22.follow(nena, 25)
    enemigos.push(enemigo22)
    barras_enemigo.push(vida_enemigo2)
}

statusbars.onZero(StatusBarKind.Health, function on_on_zero2(barra2: StatusBarSprite) {
    if (nena) {
        controller.moveSprite(nena, 0, 0)
        nena.startEffect(effects.disintegrate, 500)
    }
    
    music.stopAllSounds()
    pause(600)
    game.over(false, effects.melt)
})
function poner_hud(img2: Image) {
    
    if (rosa_hud) {
        sprites.destroy(rosa_hud)
    }
    
    rosa_hud = sprites.create(img2, SpriteKind.vacio)
    rosa_hud.setFlag(SpriteFlag.RelativeToCamera, true)
    rosa_hud.z = 200
}

function iniciar_nivel_2() {
    
    if (vida_jugador) {
        sprites.destroy(vida_jugador)
        vida_jugador = null
    }
    
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    muertes_n2 = 0
    objetivo_n2 = 10
    music.play(music.createSong(assets.song`
            nivel2
            `), music.PlaybackMode.LoopingInBackground)
    nivel = 2
    tiles.setCurrentTilemap(tilemap`
        nivel2
        `)
    nena.setPosition(40, 470)
    controller.moveSprite(nena, 100, 100)
    scene.cameraFollowSprite(nena)
    vida_jugador = statusbars.create(20, 2, StatusBarKind.Health)
    vida_jugador.attachToSprite(nena)
}

function scenefive() {
    
    en_transicion = true
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    music.stopAllSounds()
    rosa_actual = null
    if (rosa_hud) {
        sprites.destroy(rosa_hud)
        rosa_hud = null
    }
    
    if (nena) {
        controller.moveSprite(nena, 0, 0)
        nena.setFlag(SpriteFlag.Invisible, true)
    }
    
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    scene.cameraFollowSprite(null)
    scene.centerCameraAt(80, 60)
    fondo_transicion = sprites.create(img`
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
            `, SpriteKind.vacio)
    fondo_transicion.setPosition(80, 60)
    fondo_transicion.setFlag(SpriteFlag.RelativeToCamera, true)
    fondo_transicion.setFlag(SpriteFlag.Ghost, true)
    fondo_transicion.z = 2000
    fondo_transicion.startEffect(effects.coolRadial, 500)
    game.showLongText("El veus al final de la habitació... t'està esperant.", DialogLayout.Bottom)
    pause(1200)
    sprites.destroy(fondo_transicion)
    iniciar_nivel_3()
    en_transicion = false
}

function sceneOne() {
    scene.setBackgroundImage(assets.image`
        fondo_3am
        `)
    game.showLongText("Son les 3:33 AM. El mòbil vibra una altra vegada. No recordes quan has obert TikTok… però tampoc quan l'has deixat.", DialogLayout.Bottom)
    scenetwo()
}

function crear_enemigo_youtube() {
    
    enemigo22 = sprites.create(assets.image`
        youtubre
        `, SpriteKind.Enemy)
    enemigo22.setPosition(nena.x + randint(-60, 60), nena.y + randint(-60, 60))
    vida_enemigo2 = statusbars.create(20, 2, StatusBarKind.EnemyHealth)
    vida_enemigo2.max = 30
    vida_enemigo2.value = 30
    vida_enemigo2.attachToSprite(enemigo22)
    enemigo22.follow(nena, 30)
    enemigos.push(enemigo22)
    barras_enemigo.push(vida_enemigo2)
}

let enemigo22 : Sprite = null
let vida_enemigo2 : StatusBarSprite = null
let fondo_transicion : Sprite = null
let objetivo_n2 = 0
let muertes_n2 = 0
let i = 0
let es_elon = false
let win : Sprite = null
let en_transicion = false
let rosas = 0
let barras_enemigo : StatusBarSprite[] = []
let enemigos : Sprite[] = []
let s : Sprite = null
let ultima_direccion = ""
let invulnerable_boss = false
let bala3 : Sprite = null
let sy = 0
let sx = 0
let dy = 0
let dx = 0
let Play : Sprite = null
let nivel = 0
let invulnerable = false
let rosa_hud : Sprite = null
let rosa_actual : Sprite = null
let nena : Sprite = null
let vida_jugador : StatusBarSprite = null
let elon : Sprite = null
let barra22 : StatusBarSprite = null
invulnerable = false
scene.setBackgroundImage(assets.image`
    fondo_inicio1
    `)
sceneStart()
game.onUpdateInterval(1000, function on_update_interval() {
    if (en_transicion) {
        return
    }
    
    if (nena && (elon && nivel == 3)) {
        torreta_dispara()
    }
    
})
game.onUpdateInterval(4000, function on_update_interval2() {
    if (en_transicion) {
        return
    }
    
    if (nena && nivel == 1) {
        crear_enemigo_tiktok()
    } else if (nena && nivel == 2) {
        crear_enemigo_youtube()
    }
    
})
