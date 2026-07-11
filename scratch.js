function countSubmenuButtons(submenu) {
    return submenu.querySelectorAll('button').length;
}

// Populate Track submenu
const trackSubmenu = document.getElementById('trackSubmenu');
// Array to hold third-level submenus, one per body (Sun + planets) plus Asteroids
const bodySubmenus = [];

function updatePlanes(focusedPlanet) {
    // Hide both planes if no valid planet or no orbital elements
    if (!focusedPlanet || !focusedPlanet.data.orbitalElements ) {
        orbitalPlaneMesh.visible = false;
        equatorialPlaneMesh.visible = false;
        xAxisLine.visible = false;
        yAxisLine.visible = false;
        zAxisLine.visible = false;
        xAxisLabel.visible = false;
        yAxisLabel.visible = false;
        zAxisLabel.visible = false;
        return;
    }

    const planetRadius = focusedPlanet.data.radius * nHardCodeScaleFactor;
    const { finalPlanetScale } = getScaleForObject(focusedPlanet);
    const scaledRadius = planetRadius * finalPlanetScale;
    const planeSize = 6 * scaledRadius;

    // Get planet's world position
    const planetPos = new THREE.Vector3();
    const mesh = focusedPlanet.mesh instanceof THREE.Group ? focusedPlanet.mesh.children[0] : focusedPlanet.mesh;
    mesh.getWorldPosition(planetPos);

    if(focusedPlanet.data.name != "Sun")
    {
        // Update Orbital Plane (existing logic)
        const { i, Omega } = focusedPlanet.data.orbitalElements;
        const iRad = i * (Math.PI / 180);
        const OmegaRad = Omega * (Math.PI / 180);

        // Orbital plane normal
        const orbitalNormal = new THREE.Vector3(
            Math.sin(iRad) * Math.sin(OmegaRad),
            -Math.sin(iRad) * Math.cos(OmegaRad),
            Math.cos(iRad)
        ).normalize();

        // Position and orient orbital plane
        orbitalPlaneMesh.position.copy(planetPos);
        orbitalPlaneMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), orbitalNormal);
        orbitalPlaneMesh.scale.set(planeSize, planeSize, 1);

        // Update axes (same as before)
        const cornerOffset = new THREE.Vector3(-planeSize / 2, planeSize / 2, 0);
        const cornerPos = planetPos.clone().add(
        cornerOffset.clone().applyQuaternion(
            new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), orbitalNormal)
        )
        );

        const axisScale = scaledRadius;
        xAxisLine.scale.set(axisScale, 1, 1);
        yAxisLine.scale.set(1, axisScale, 1);
        zAxisLine.scale.set(1, 1, axisScale);

        xAxisLine.quaternion.set(0, 0, 0, 1);
        yAxisLine.quaternion.set(0, 0, 0, 1);
        zAxisLine.quaternion.set(0, 0, 0, 1);

        xAxisLine.position.copy(cornerPos);
        yAxisLine.position.copy(cornerPos);
        zAxisLine.position.copy(cornerPos);

        xAxisLabel.position.copy(cornerPos).add(new THREE.Vector3(axisScale, 0, 0));
        yAxisLabel.position.copy(cornerPos).add(new THREE.Vector3(0, axisScale, 0));
        zAxisLabel.position.copy(cornerPos).add(new THREE.Vector3(0, 0, axisScale));

        const labelScale = scaledRadius * 5;
        xAxisLabel.scale.set(labelScale, labelScale, 1);
        yAxisLabel.scale.set(labelScale, labelScale, 1);
        zAxisLabel.scale.set(labelScale, labelScale, 1);

        // Toggle axes visibility with orbital plane
        xAxisLine.visible = orbitalPlaneMesh.visible;
        yAxisLine.visible = orbitalPlaneMesh.visible;
        zAxisLine.visible = orbitalPlaneMesh.visible;
        xAxisLabel.visible = orbitalPlaneMesh.visible;
        yAxisLabel.visible = orbitalPlaneMesh.visible;
        zAxisLabel.visible = orbitalPlaneMesh.visible;
    }
    else
    {
        orbitalPlaneMesh.visible = false;
        xAxisLine.visible = false;
        yAxisLine.visible = false;
        zAxisLine.visible = false;
        xAxisLabel.visible = false;
        yAxisLabel.visible = false;
        zAxisLabel.visible = false;
    }
    // Update Equatorial Plane
    equatorialPlaneMesh.position.copy(planetPos);
    // Use initialQuaternion for alignment
    if (focusedPlanet.initialQuaternion) {
        const orientationQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), (Math.PI / 2 ) );
        const equatorialQuanternion = new THREE.Quaternion().multiplyQuaternions(focusedPlanet.initialQuaternion, orientationQuaternion);
        equatorialPlaneMesh.quaternion.copy(equatorialQuanternion);
    }
    equatorialPlaneMesh.scale.set(planeSize, planeSize, 1);
}

function updateOrbitControlScale(planetRadius, finalPlanetScale )
{
    const scaledRadius = planetRadius * finalPlanetScale;
    orbitControls.minDistance = scaledRadius * 1.2;
    orbitControls.maxDistance = Infinity;
    orbitControls.update();
}

function focusOnPlanet(focusedPlanet) {
    const cogName = focusedPlanet.data.type === "star" ? focusedPlanet.data.name : focusedPlanet.parent.name;
    focusedCenterOfGravity = getMeshByName(cogName);
    displayPhotoContent();
    trackingPlanet = true;
    document.getElementById('focusBox').style.display = 'block';
    focusCube.visible = true;
    const isMesh = focusedPlanet.data.mesh ? true : false;
    const planetRadius = focusedPlanet.data.radius * nHardCodeScaleFactor;
    const { finalPlanetScale, finalOrbitScale } = getScaleForObject(focusedPlanet);
    const scaledRadius = planetRadius * finalPlanetScale;
    focusCube.scale.set(planetRadius * finalPlanetScale * 2.2, planetRadius * finalPlanetScale * 2.2, planetRadius * finalPlanetScale * 2.2);
    const distanceMultiplier = focusedPlanet.data.type === "moon" ? 20 : 15;
    const targetDistance = scaledRadius * distanceMultiplier;
    const planetPos = new THREE.Vector3();
    const mesh = focusedPlanet.mesh instanceof THREE.Group ? focusedPlanet.mesh.children[0] : focusedPlanet.mesh;
    mesh.getWorldPosition(planetPos);
    const direction = camera.position.clone().sub(orbitControls.target).normalize();
    camera.position.copy(planetPos).add(direction.multiplyScalar(targetDistance));
    orbitControls.target.copy(planetPos);
    updateOrbitControlScale(planetRadius,finalPlanetScale);
    const descriptionText = document.getElementById('descriptionContent');
    if (focusedPlanet) {
        descriptionText.innerHTML = planetDescriptions[focusedPlanet.data.name] || 'No description available.';
    } else {
        descriptionText.innerHTML = 'Select a planet to see its description.';
    }
    // Update orbital plane
    updatePlanes(focusedPlanet);
    if (isFPSMode) {
        focusedPlanet = null;
        trackingPlanet = null;
        orbitalPlaneMesh.visible = false;
        xAxisLine.visible = false;
        yAxisLine.visible = false;
        zAxisLine.visible = false;
        xAxisLabel.visible = false;
        yAxisLabel.visible = false;
        zAxisLabel.visible = false;
    }
}

// Separate asteroids from other bodies
const asteroids = bodies.filter(body => body.type === "asteroid");
const nonAsteroidBodies = bodies.filter(body => body.type !== "asteroid");

// Create containers for all non-asteroid bodies first
const bodyContainers = nonAsteroidBodies.map((body, index) => {
    const bodyContainer = document.createElement('div');
    bodyContainer.className = 'submenu-container';
    const bodyButton = document.createElement('button');
    bodyButton.className = 'button submenu-toggle';
    bodyButton.textContent = body.name;
    bodyContainer.appendChild(bodyButton);
    const bodySubmenu = document.createElement('div');
    bodySubmenu.className = 'submenu';
    bodySubmenu.id = `track-submenu-${body.name.toLowerCase().replace(/\s+/g, '-')}`;
    bodySubmenus[index] = bodySubmenu;
    const bodyFocusButton = document.createElement('button');
    bodyFocusButton.className = 'button';
    bodyFocusButton.textContent = body.name;
    bodyFocusButton.addEventListener('click', () => {
        focusedPlanet = getMeshByName(body.name);
        if (focusedPlanet) {
            focusOnPlanet(focusedPlanet);
        }
    });
    bodySubmenu.appendChild(bodyFocusButton);
    body.moons.forEach(moon => {
        const moonButton = document.createElement('button');
        moonButton.className = 'button';
        moonButton.textContent = moon.name;
        moonButton.addEventListener('click', () => {
            focusedPlanet = getMeshByName(moon.name);
            if (focusedPlanet) {
                focusOnPlanet(focusedPlanet);
            }
        });
        bodySubmenu.appendChild(moonButton);
    });
    bodyContainer.appendChild(bodySubmenu);
    bodySubmenu.style.display = 'none';

    // Function to adjust submenu position
    function adjustSubmenuPosition() {
        // Temporarily show submenu to measure size
        bodySubmenu.style.display = 'flex';
        bodySubmenu.style.visibility = 'hidden'; // Hide from view but keep in layout
        const submenuRect = bodySubmenu.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const parentRect = bodyContainer.getBoundingClientRect();
        // Default position (right of parent)
        let left = parentRect.right;
        let top = parentRect.top;
        // Check if submenu exceeds right edge
        if (left + submenuRect.width > viewportWidth - 10) { // 10px margin
            left = parentRect.left - submenuRect.width; // Place to the left
        }
        // Check if submenu exceeds bottom edge
        if (top + submenuRect.height > viewportHeight - 10) {
            top = viewportHeight - submenuRect.height - 10; // Adjust upwards
        }
        // Ensure submenu doesn't go off the left edge
        if (left < 10) {
            left = 10;
        }
        // Ensure submenu doesn't go off the top edge
        if (top < 10) {
            top = 10;
        }
        bodySubmenu.style.position = 'absolute';
        bodySubmenu.style.left = `${left}px`;
        bodySubmenu.style.top = `${top}px`;
        // Reset visibility
        bodySubmenu.style.visibility = 'visible';
        bodySubmenu.style.display = 'none'; // Hide again until hover
    }

    bodyButton.addEventListener('mouseenter', () => {
        bodySubmenus.forEach(submenu => submenu.style.display = 'none');
        adjustSubmenuPosition();
        bodySubmenu.style.display = 'flex';
    });

    bodyContainer.addEventListener('mouseleave', () => {
        bodySubmenu.style.display = 'none';
    });

    // Adjust position on window resize
    window.addEventListener('resize', adjustSubmenuPosition);

    return bodyContainer;
});

// Find the index of Mars
const marsIndex = nonAsteroidBodies.findIndex(body => body.name === "Mars");

// Append non-asteroid bodies up to Mars
for (let i = 0; i <= marsIndex; i++) {
    trackSubmenu.appendChild(bodyContainers[i]);
}

// Add Asteroids submenu after Mars
const asteroidContainer = document.createElement('div');
asteroidContainer.className = 'submenu-container';
const asteroidButton = document.createElement('button');
asteroidButton.className = 'button submenu-toggle';
asteroidButton.textContent = 'Asteroid Belt';
asteroidContainer.appendChild(asteroidButton);
const asteroidSubmenu = document.createElement('div');
asteroidSubmenu.className = 'submenu';
asteroidSub ┴menu.id = 'track-submenu-asteroids';
bodySubmenus.push(asteroidSubmenu);
asteroids.forEach(asteroid => {
    const asteroidFocusButton = document.createElement('button');
    asteroidFocusButton.className = 'button';
    asteroidFocusButton.textContent = asteroid.name;
    asteroidFocusButton.addEventListener('click', () => {
        focusedPlanet = getMeshByName(asteroid.name);
        if (focusedPlanet) {
            focusOnPlanet(focusedPlanet);
        }
    });
    asteroidSubmenu.appendChild(asteroidFocusButton);
});
asteroidContainer.appendChild(asteroidSubmenu);
trackSubmenu.appendChild(asteroidContainer);
asteroidSubmenu.style.display = 'none';

// Adjust Asteroid submenu position
function adjustAsteroidSubmenuPosition() {
    asteroidSubmenu.style.display = 'flex';
    asteroidSubmenu.style.visibility = 'hidden';
    
    // Count the number of buttons in the submenu
    const buttonCount = countSubmenuButtons(asteroidSubmenu);
    console.log(`Asteroid submenu has ${buttonCount} buttons`);
    
    const submenuRect = asteroidSubmenu.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const parentRect = asteroidContainer.getBoundingClientRect();
    let left = parentRect.right;
    let top = parentRect.top;
    if (left + submenuRect.width > viewportWidth - 10) {
        left = parentRect.left - submenuRect.width;
    }
    if (top + submenuRect.height > viewportHeight - 10) {
        top = viewportHeight - submenuRect.height - 10;
    }
    if (left < 10) {
        left = 10;
    }
    if (top < 10) {
        top = 10;
    }
    asteroidSubmenu.style.position = 'absolute';
    asteroidSubmenu.style.left = `${left}px`;
    asteroidSubmenu.style.top = `${top}px`;
    asteroidSubmenu.style.visibility = 'visible';
    asteroidSubmenu.style.display = 'none';
}

asteroidButton.addEventListener('mouseenter', () => {
    bodySubmenus.forEach(submenu => submenu.style.display = 'none');
    adjustAsteroidSubmenuPosition();
    asteroidSubmenu.style.display = 'flex';
});

asteroidContainer.addEventListener('mouseleave', () => {
    asteroidSubmenu.style.display = 'none';
});

// Adjust position on window resize for asteroids
window.addEventListener('resize', adjustAsteroidSubmenuPosition);

// Append the remaining non-asteroid bodies after Asteroids
for (let i = marsIndex + 1; i < bodyContainers.length; i++) {
    trackSubmenu.appendChild(bodyContainers[i]);
}

// Verify the array size matches the number of non-asteroid bodies plus Asteroids submenu
console.log(`Total non-asteroid bodies: ${nonAsteroidBodies.length}, Asteroids: ${asteroids.length}, bodySubmenus length: ${bodySubmenus.length}`);