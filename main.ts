scene.setBackgroundColor(6)
// Shark
let mySprite = sprites.create(assets.image`shark1`, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
let facing_left = false
// Food
let heartfood = sprites.create(assets.image`heart`, SpriteKind.Food)
// obstacle
let obstacle = sprites.create(assets.image`obstacle`, SpriteKind.Enemy)
obstacle.setPosition(-20, -20)
let obstacle_active = false
//  Safe position finder for obstacle
function get_safe_obstacle_position(): number[] {
    let x: number;
    let y: number;
    let dx: number;
    let dy: number;
    while (true) {
        x = randint(10, 150)
        y = randint(10, 110)
        dx = Math.abs(x - mySprite.x)
        dy = Math.abs(y - mySprite.y)
        //  must be at least 30px away from shark
        if (dx > 30 || dy > 30) {
            return [x, y]
        }
        
    }
}

//  Check and move obstacle safely
function check_for_obstacle() {
    
    if (info.score() >= 5) {
        let [x, y] = get_safe_obstacle_position()
        if (!obstacle_active) {
            obstacle_active = true
            obstacle.setPosition(x, y)
        } else {
            obstacle.setPosition(x, y)
        }
        
    }
    
}

//  Eating
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function on_overlap(sprite: Sprite, otherSprite: Sprite) {
    info.changeScoreBy(1)
    otherSprite.setPosition(randint(10, 150), randint(10, 110))
    info.startCountdown(10)
    check_for_obstacle()
})
// Shark_image_animation
game.onUpdate(function on_update() {
    
    if (controller.dx() > 0 && !facing_left) {
        mySprite.image.flipX()
        facing_left = true
    } else if (controller.dx() < 0 && facing_left) {
        mySprite.image.flipX()
        facing_left = false
    }
    
})
// When shark hits obstacle
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_hit_obstacle(sprite: Sprite, otherSprite: Sprite) {
    game.over(false, effects.melt)
})
