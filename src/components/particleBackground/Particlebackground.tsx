import { Box } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import particleConfig from '../../config/particle.config';

const ParticleBackground = () => {
    const particlesInit = useCallback(async (engine: any) => {
        await loadFull(engine);
    }, []); // Add an empty dependency array

    const particlesLoaded = useCallback(async (container: any) => {
        // console.log(container); // Removed the await here
    }, []); // Add an empty dependency array

    return (
        <Box>
            <Particles
                id='tsparticles'
                init={particlesInit as any}
                loaded={particlesLoaded}
                options={particleConfig as any}
                height='100vh'
                width='100vw'
            />
        </Box>
    );
};

export default ParticleBackground;