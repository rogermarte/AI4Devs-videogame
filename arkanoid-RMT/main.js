document.getElementById('start-button').addEventListener('click', function() {
    this.disabled = true; // Desactivar el botón de inicio
    const config = {
        type: Phaser.CANVAS,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 }
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        },
        parent: 'game-container',
        render: {
            pixelArt: false,
            antialias: true
        },
        canvas: document.createElement('canvas'),
        renderType: Phaser.CANVAS
    };

    config.canvas.getContext('2d', { willReadFrequently: true });

    const game = new Phaser.Game(config);

    function preload() {
        // No necesitamos cargar ninguna imagen
    }
    
    function create() {
        // Inicializar el contador de vidas
        this.lives = 3;

        // Crear texturas para las paletas usando gráficos generados por código
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });

        // Paleta corta
        graphics.fillStyle(0xff0000, 1); // Rojo
        graphics.fillRect(0, 0, 32, 16);
        graphics.fillStyle(0xffa500, 1); // Naranja
        graphics.fillRect(8, 0, 16, 16);
        graphics.generateTexture('paddle_short', 32, 16);

        // Mostrar las vidas restantes en la parte superior derecha
        this.livesGroup = this.add.group({
            key: 'paddle_short',
            repeat: this.lives - 1,
            setXY: { x: 650, y: 20, stepX: 50 }
        });

        // Paleta media
        graphics.clear();
        graphics.fillStyle(0xff0000, 1); // Rojo
        graphics.fillRect(0, 0, 64, 16);
        graphics.fillStyle(0xffa500, 1); // Naranja
        graphics.fillRect(8, 0, 48, 16);
        graphics.generateTexture('paddle_medium', 64, 16);

        // Paleta larga
        graphics.clear();
        graphics.fillStyle(0xff0000, 1); // Rojo
        graphics.fillRect(0, 0, 128, 16);
        graphics.fillStyle(0xffa500, 1); // Naranja
        graphics.fillRect(8, 0, 112, 16);
        graphics.generateTexture('paddle_long', 128, 16);

        // Añadir el jugador (paleta media) a la escena
        this.player = this.physics.add.image(400, 550, 'paddle_medium');
        this.player.setCollideWorldBounds(true);

        // Configurar los controles
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Crear texturas para los bloques
        const blockColors = [0xffa500, 0xff4500, 0x32cd32, 0x1e90ff, 0xff69b4, 0x00ffff, 0xffff00, 0xffc0cb];
        blockColors.forEach((color, index) => {
            graphics.clear();
            graphics.fillStyle(color, 1);
            graphics.fillRect(0, 0, 64, 32);
            graphics.generateTexture(`block_${index}`, 64, 32);
        });

        // Añadir los bloques a un grupo de físicas
        this.blocks = this.physics.add.staticGroup();

        for (let i = 0; i < 11; i++) { // Aumentar el número de bloques en horizontal
            for (let j = 0; j < 5; j++) {
                this.blocks.create(50 + i * 70, 50 + j * 45, `block_${i % blockColors.length}`);
            }
        }

        // Crear la pelota blanca
        graphics.clear();
        graphics.fillStyle(0xffffff, 1); // Blanco
        graphics.fillCircle(8, 8, 8);
        graphics.generateTexture('ball', 16, 16);

        // Añadir la pelota a la escena
        this.ball = this.physics.add.image(this.player.x, this.player.y - 16, 'ball');
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1, 1);

        // Hacer que la pelota colisione con la paleta
        this.physics.add.collider(this.ball, this.player, function(ball, player) {
            ball.setVelocityY(-300);
        });

        // Hacer que la pelota colisione con los bloques
        this.physics.add.collider(this.ball, this.blocks, hitBlock, null, this);

        // Añadir el texto de "Vida perdida"
        this.loseLifeText = this.add.text(400, 300, 'Vida perdida', {
            fontSize: '32px',
            fill: '#ff0000'
        }).setOrigin(0.5);
        this.loseLifeText.setVisible(false);
    }

    function update() {
        // Asegurar que la paleta no se mueva verticalmente
        this.player.y = 550;

        // Reiniciar la velocidad del jugador
        this.player.setVelocityX(0);

        // Mover el jugador a la izquierda y derecha
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-300);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(300);
        }

        // Si la pelota está pegada a la paleta, moverla con la paleta
        if (this.ball.body.velocity.y === 0) {
            this.ball.x = this.player.x;
        }

        // Lógica para disparar la pelota
        if (this.spaceBar.isDown && this.ball.body.velocity.y === 0) {
            this.ball.setVelocity(-75, -300);
        }

        // Comprobar si la pelota se ha perdido
        if (this.ball.y >= this.sys.game.config.height - 10) {
            console.log('Pelota perdida en posición:', this.ball.x, this.ball.y);
            loseLife.call(this);
        }
    }

    function loseLife() {
        console.log('Perdiendo una vida');
        this.lives--;

        // Eliminar una vida de la pantalla
        this.livesGroup.getChildren()[this.lives].destroy();
        // Hacer que la pelota desaparezca
        this.ball.setVisible(false);

        if (this.lives > 0) {
            console.log('Vidas restantes:', this.lives);
            // Mostrar el texto de "Vida perdida"
            this.loseLifeText.setVisible(true);

            // Reiniciar la posición de la pelota y la paleta después de un breve retraso
            this.time.delayedCall(1000, () => {
                this.loseLifeText.setVisible(false);
                this.ball.setPosition(this.player.x, this.player.y - 16);
                this.ball.setVelocity(0);
                this.ball.setVisible(true); // Hacer que la pelota vuelva a ser visible
            }, [], this);
        } else {
            console.log('Juego terminado');
            // Mostrar el texto de "GAME OVER"
            this.add.text(400, 300, 'GAME OVER', {
                fontSize: '64px',
                fill: '#ff0000'
            }).setOrigin(0.5);

            // Desactivar la interacción del juego
            this.physics.pause();
            this.input.keyboard.enabled = false;
        }
    }

    function hitBlock(ball, block) {
        // Cambiar la dirección de la pelota en función de la colisión
        if (ball.body.velocity.y > 0) {
            ball.setVelocityY(-ball.body.velocity.y);
        } else {
            ball.setVelocityY(ball.body.velocity.y);
        }

        if (ball.body.velocity.x > 0) {
            ball.setVelocityX(-ball.body.velocity.x);
        } else {
            ball.setVelocityX(ball.body.velocity.x);
        }

        // Destruir el bloque inmediatamente
        block.destroy();
    }

    function shoot() {
        // Lógica para disparar
        console.log('Disparo!');
    }
});