scene.set_background_color(6)

#Shark
mySprite = sprites.create(assets.image("""shark1"""),
    SpriteKind.player)
controller.move_sprite(mySprite)
mySprite.set_stay_in_screen(True)
facing_left = False

#Food
heartfood = sprites.create(assets.image("""heart"""),
    SpriteKind.food)

#obstacle
obstacle = sprites.create(assets.image("""obstacle"""),
    SpriteKind.enemy)
obstacle.set_position(-20, -20)
obstacle_active = False

# Safe position finder for obstacle
def get_safe_obstacle_position():
    while True:
        x = randint(10, 150)
        y = randint(10, 110)
        dx = abs(x - mySprite.x)
        dy = abs(y - mySprite.y)
        # must be at least 30px away from shark
        if dx > 30 or dy > 30:
            return x, y

# Check and move obstacle safely
def check_for_obstacle():
    global obstacle_active
    if info.score() >= 5:
        x, y = get_safe_obstacle_position()
        if not obstacle_active:
            obstacle_active = True
            obstacle.set_position(x, y)
        else:
            obstacle.set_position(x, y)

# Eating
def on_overlap(sprite, otherSprite):
    info.change_score_by(1)
    otherSprite.set_position(randint(10, 150), randint(10, 110))
    info.start_countdown(10)
    check_for_obstacle()

sprites.on_overlap(SpriteKind.player, SpriteKind.food, on_overlap)

#Shark_image_animation
def on_update():
    global facing_left

    if controller.dx() > 0 and not facing_left:
        mySprite.image.flip_x()
        facing_left = True
    elif controller.dx() < 0 and facing_left:
        mySprite.image.flip_x()
        facing_left = False
game.on_update(on_update)

#When shark hits obstacle
def on_hit_obstacle(sprite, otherSprite):
    game.over(False, effects.melt)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_hit_obstacle)

