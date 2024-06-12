window.onload = async function () {
        // PixiJS initialization
        const app = new PIXI.Application();
        await app.init({
            width: 800,
            height: 600,
            backgroundColor: 0x1099bb,
            resolution: window.devicePixelRatio || 1,
        });

        // Append the PixiJS canvas to a specific div
        const pixiContainer = document.getElementById('pixi-container');
        if (!pixiContainer) {
            throw new Error('Pixi container not found');
        }

        pixiContainer.appendChild(app.view);

        const container = new PIXI.Container();
        app.stage.addChild(container);

        // Load the texture
        const texture = PIXI.Texture.from('assets/81a4e680815973.5cec6bcf6aa1a.jpg');

        texture.baseTexture.on('loaded', () => {
            console.log('Texture loaded successfully');
            // Create a 5x5 grid of sprites using the texture
            for (let i = 0; i < 25; i++) {
                const sprite = new PIXI.Sprite(texture);
                sprite.anchor.set(0.5);
                sprite.x = (i % 5) * 40;
                sprite.y = Math.floor(i / 5) * 40;
                container.addChild(sprite);
            }

            // Center the container on the screen
            container.x = app.screen.width / 2;
            container.y = app.screen.height / 2;

            container.pivot.x = container.width / 2;
            container.pivot.y = container.height / 2;

            // Add a glow filter
            const glowFilter = new PIXI.filters.GlowFilter({ distance: 15, outerStrength: 2, color: 0xff0000 });
            container.filters = [glowFilter];

            // Animate the container by rotating it continuously
            app.ticker.add((delta) => {
                container.rotation -= 0.01 * delta;
            });
        });

        texture.baseTexture.on('error', (error) => {
            console.error('Error loading texture:', error);
        });
};
