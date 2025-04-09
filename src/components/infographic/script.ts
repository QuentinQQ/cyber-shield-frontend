function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function createIcon(gender, size, state = 'normal') {
    const img = document.createElement('img');
    let iconSrc;
    let tooltipText;

    // Determine the icon source based on gender and state
    if (gender === 'boy') {
    iconSrc = state === 'orange' ? 'boy_orange.svg' :
            state === 'maroon' ? 'boy_maroon.svg' : 'boy.svg';
    } else {
    iconSrc = state === 'orange' ? 'girl_orange.svg' :
            state === 'maroon' ? 'girl_maroon.svg' : 'girl.svg';
    }

    // Set tooltip text based on the state
    if (state === 'orange') {
    tooltipText = "You may feel isolated or afraid to speak up, but you're not alone. It’s important to reach out to someone you trust.";
    } else if (state === 'maroon') {
    tooltipText = "Talking to your parents is a great first step in getting the support you need. They care about you and want to help.";
    } else {
    tooltipText = "It’s great that you haven’t experienced bullying, but it's important to be aware and supportive of others who might be going through it.";
    }

    // Set icon properties
    img.src = iconSrc;
    img.className = 'icon';
    img.style.setProperty('--icon-size', `${size}px`);
    img.setAttribute('title', tooltipText)


    return img; // Return the created icon
}

export const generate = async () => {
    await sleep(100);


    // Get references 
    const grid = document.getElementById("grid");
    const caption1 = document.getElementById("caption1");
    const caption2 = document.getElementById("caption2");
    const caption3 = document.getElementById("caption3");
    const caption4 = document.getElementById("caption4");
    const pop = document.getElementById("pop") as HTMLAudioElement;

    // Reset the grid and captions
    grid.innerHTML = '';
    caption1.classList.remove('show');
    caption2.classList.remove('show');
    caption3.classList.remove('show');
    caption4.classList.remove('show');
    caption1?.classList.add('hide');
    caption2?.classList.add('hide');
    caption3?.classList.add('hide');
    caption4?.classList.add('hide');

    // Get the number of students from the input field
    let count = parseInt(document.getElementById("studentCount").value);
    if (isNaN(count) || count < 10 || count > 200) {
    alert("Enter a number between 10 and 200");
    return;
    }
    
    // Calculate icon size and set grid layout
    const iconSize = Math.max(24, 60 - (count - 10) * 0.2);
    grid.style.gridTemplateColumns = `repeat(auto-fill, minmax(${iconSize}px, 1fr))`;

    // Half boys and half girls
    let icons = [];
    for (let i = 0; i < count; i++) {
        let gender = Math.random() < 0.5 ? 'boy' : 'girl';
        let icon = createIcon(gender, iconSize);
        grid.appendChild(icon);
        icons.push({ icon, gender });
    }

    // Let's identify the victims (30%): 60% girls, 40% boys
    const bulliedCount = Math.ceil(count * 0.3);
    const numGirls = Math.round(bulliedCount * 0.6);
    const numBoys = bulliedCount - numGirls;

    let girls = icons.filter(p => p.gender === 'girl');
    let boys = icons.filter(p => p.gender === 'boy');
    let bullied = [];

    let selectedGirls = 0; // Counter for selected girls
    let selectedBoys = 0; // Counter for selected boys

    // Randomly select victims
    while (bullied.length < bulliedCount) {
        // Let's decide whom to choose: a girl or a boy
        let chooseGirl = Math.random() < 0.6; // 60% chance to choose a girl
        
        // If the limit for girls is reached, force choosing a boy
        if (selectedBoys >= numBoys) {
            chooseGirl = true;
        }
        if (selectedGirls >= numGirls) {
            chooseGirl = false;
        }

            // Select from the appropriate array
        let arr = chooseGirl ? girls : boys;

        // If the selected gender array is empty, switch to the other
        if (arr.length === 0) {
            arr = arr === girls ? boys : girls;
        }

        // Select a random student from the array
        const idx = Math.floor(Math.random() * arr.length);
        bullied.push(arr[idx]);
        arr.splice(idx, 1);
        
        // Update the counters
        if (chooseGirl) {
            selectedGirls++;
        } else {
            selectedBoys++;
        }
    }
    // Highlight victims 
    for (let i = 0; i < bullied.length; i++) {
        await sleep(100 + Math.random() * 100);
        const gender = bullied[i].gender;
        const size = parseInt(bullied[i].icon.style.getPropertyValue('--icon-size'));
        const orangeIcon = createIcon(gender, size, 'orange');
        grid.replaceChild(orangeIcon, bullied[i].icon);
        bullied[i].icon = orangeIcon;
        pop.currentTime = 0;
        pop.volume = 1;
        await pop.play();
    }
    // Show the first caption
    caption1?.classList.remove('hide');
    caption1.classList.add('show', 'orange');

    
    await sleep(2100);

    caption1.classList.remove('show');
    await sleep(800);
    caption1.classList.add('hide');
    
    const highlightGirls = async () => {
        for (let i = 0; i < bullied.length; i++) {
          if (bullied[i].gender === 'girl') {
            bullied[i].icon.classList.add('bright'); 
          }
        }
      
        await sleep(3000); 
      
        for (let i = 0; i < bullied.length; i++) {
          if (bullied[i].gender === 'girl') {
            bullied[i].icon.classList.remove('bright'); 
          }
        }
      };

    caption11.classList.remove('hide');
    caption11.classList.add('show', 'orange');
    await highlightGirls(); 
    await sleep(1500);
    caption11.classList.remove('show');
    await sleep(800);
    caption11.classList.add('hide');

    // Show the second caption
    caption2.classList.remove('hide');
    
    // After a second, highlight 20% of the victims
    const disclosedCount = Math.max(1, Math.round(bulliedCount * 0.2));
    for (let i = 0; i < disclosedCount; i++) {
        await sleep(100 + Math.random() * 100);
        const gender = bullied[i].gender;
        const size = parseInt(bullied[i].icon.style.getPropertyValue('--icon-size'));
        const maroonIcon = createIcon(gender, size, 'maroon');
        grid.replaceChild(maroonIcon, bullied[i].icon);
        bullied[i].icon =maroonIcon;
        pop.currentTime = 0;
        await pop.play();
    }
    caption2.classList.add('show', 'maroon');
    await sleep(4000);
    caption2.classList.remove('show');
    await sleep(800);
    caption2.classList.add('hide');

    // Show the third caption
    caption3.classList.remove('hide');
    caption3.classList.add('show', 'green');
    await sleep(3200);
    caption3.classList.remove('show');
    await sleep(800);
    caption3.classList.add('hide');

    // Show the fourth caption
    caption4.classList.remove('hide');
    caption4.classList.add('show', 'blue');
}