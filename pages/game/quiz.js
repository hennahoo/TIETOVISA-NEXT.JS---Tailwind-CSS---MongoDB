import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { AnimationMixer } from 'three';
import Header from '../../components/Header';
import dbConnect from '../../utils/dbConnect';
import styles from '../../styles/quiz.module.css';

//import GameResultModel from '../../.models/GameResultModel';
//import GameResultModel from '../models/GameResultModel';
// Usage of GameResultModel in your Next.js components or routes

//dbConnect();

const questions = [
  {
    question: 'Mikä on pääkaupunki Ranskassa?',
    options: ['Lontoo', 'Pariisi', 'Berliini', 'Rooma'],
    correctAnswer: 'Pariisi',
  },
  {
    question: 'Kuinka monta planeettaa on aurinkokunnassamme?',
    options: ['5', '8', '9', '12'],
    correctAnswer: '8',
  },
  // Lisää lisää kysymyksiä tähän
];

const Avatar = ({ playRumba }) => {
  const mountRef = useRef(null);
  const mixerRef = useRef(null);
  const idleActionRef = useRef(null);
  const rumbaActionRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 1, 3);

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 2);
    pointLight1.position.set(-5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 2);
    pointLight2.position.set(5, -5, 5);
    scene.add(pointLight2);

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/'); // Set the path to the Draco decoder files in the public folder
    loader.setDRACOLoader(dracoLoader);

    loader.load('../avatar.glb', (gltf) => {
      const avatar = gltf.scene;
      avatar.position.y = -1;
      scene.add(avatar);
      console.log('Avatar loaded:', avatar); // Log avatar loading

      const mixer = new AnimationMixer(avatar);
      mixerRef.current = mixer;

      console.log('Available animations in avatar.glb:', gltf.animations.map((clip) => clip.name));
      
      // Now load the animations from animations.glb
      loader.load('../animations.glb', (animGltf) => {
        console.log('Available animations in animations.glb:', animGltf.animations.map((clip) => clip.name));

        // Apply animations to the avatar
        animGltf.animations.forEach((clip) => {
          const action = mixer.clipAction(clip);
          action.clampWhenFinished = true;
          action.loop = THREE.LoopOnce;
          if (clip.name === 'Rumba') {
            rumbaActionRef.current = action;
            console.log('Rumba animation loaded:', clip);
          } else if (clip.name === 'Idle') {
            idleActionRef.current = action;
            idleActionRef.current.play();
            console.log('Idle animation loaded and playing:', clip);
          }
        });
      }, undefined, (error) => {
        console.error(error);
      });

    }, undefined, (error) => {
      console.error(error);
    });

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (mixerRef.current) mixerRef.current.update(delta);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (playRumba && rumbaActionRef.current) {
      rumbaActionRef.current.reset().play();
    }
  }, [playRumba]);

  return <div ref={mountRef} className={styles.avatarWrapper} />;
};

export default function Quiz() {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [playRumba, setPlayRumba] = useState(false);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      setPlayRumba(true); // Trigger Rumba animation
    } else {
      setPlayRumba(false); // Stop Rumba animation
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className={styles.quizContainer}>
      <Header />
      <div className={styles.flexContainer}>
        <div className={styles.avatarContainer}>
          <Avatar playRumba={playRumba} />
        </div>
        <div className={styles.quizContent}>
          {showResult ? (
            <div>
              <h2 className={styles.result}>Pelitulokset</h2>
              <p className={styles.result}>Pistemääräsi: {score}</p>
            </div>
          ) : (
            <div>
              <h2 className={styles.question}>Kysymys {currentQuestion + 1}: {questions[currentQuestion].question}</h2>
              <div className={styles.options}>
                {questions[currentQuestion].options.map((option, index) => (
                  <button key={index} className={styles.option} onClick={() => handleAnswer(option)}>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
