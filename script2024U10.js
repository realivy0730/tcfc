document.addEventListener('DOMContentLoaded', function () {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/1ksWWiBUFbb_vDMhMKuRC9M0TNOYZFSv-7-GnoB23g-Y/export?format=csv';
    
    fetch(csvUrl)
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').filter(row => row.trim().length > 0);
            const header = rows[0].split(',');

            const numberSignIndex1 = header.indexOf('數字籤');
            const team1Index = header.indexOf('比賽球隊');
            const score1Index = header.indexOf('分數');
            const score2Index = header.lastIndexOf('分數');
            const team2Index = header.lastIndexOf('比賽球隊');
            const numberSignIndex2 = header.lastIndexOf('數字籤');
            const matchIndex = header.indexOf('場次');

            let match46Winner = null;
            let match47Winner = null;
            let match46Score = '';
            let match47Score = '';

            function processMatchResults(rows) {
                rows.forEach(row => {
                    const cells = row.split(',');
                    const team1 = cells[team1Index]?.trim();
                    const team2 = cells[team2Index]?.trim();
                    const score1 = parseInt(cells[score1Index]?.trim() || 0);
                    const score2 = parseInt(cells[score2Index]?.trim() || 0);
                    const matchNumber = parseInt(cells[matchIndex]?.trim());

                    if (matchNumber === 46) {
                        match46Winner = score1 > score2 ? team1 : team2;
                        match46Score = `${score1} : ${score2}`;
                    } else if (matchNumber === 47) {
                        match47Winner = score1 > score2 ? team1 : team2;
                        match47Score = `${score1} : ${score2}`;
                    }
                });
            }

            processMatchResults(rows.slice(1));

            const mainContainer = document.getElementById('app');
            const groupRankings = [];
            const firstPlaceTeams = [];

            const numberSignGroups = [
                ['1', '2', '3', '4'],
                ['5', '6', '7', '8'],
                ['9', '10', '11', '12'],
                ['13', '14', '15', '16'],
                ['17', '18', '19', '20'],
                ['21', '22', '23'],
                ['24', '25', '26'],
                ['27', '28', '29'],
                ['30', '31', '32'],
                ['33', '34', '35']
            ];

            function generateMatchCombinations(signs) {
                return signs.length === 3
                    ? [[signs[0], signs[1]], [signs[1], signs[2]], [signs[0], signs[2]]]
                    : [[signs[0], signs[1]], [signs[0], signs[2]], [signs[0], signs[3]], [signs[1], signs[2]], [signs[1], signs[3]], [signs[2], signs[3]]];
            }

            function calculateTeamPoints(matchedRows) {
                const teamPoints = new Map();
                matchedRows.forEach(row => {
                    const cells = row.split(',');
                    const score1 = parseInt(cells[score1Index]?.trim() || 0);
                    const score2 = parseInt(cells[score2Index]?.trim() || 0);
                    const team1 = cells[team1Index]?.trim();
                    const team2 = cells[team2Index]?.trim();

                    if (!teamPoints.has(team1)) teamPoints.set(team1, 0);
                    if (!teamPoints.has(team2)) teamPoints.set(team2, 0);

                    if (score1 > score2) {
                        teamPoints.set(team1, teamPoints.get(team1) + 3);
                    } else if (score1 < score2) {
                        teamPoints.set(team2, teamPoints.get(team2) + 3);
                    } else {
                        teamPoints.set(team1, teamPoints.get(team1) + 1);
                        teamPoints.set(team2, teamPoints.get(team2) + 1);
                    }
                });
                return teamPoints;
            }

            numberSignGroups.forEach((targetNumberSigns, groupIndex) => {
                const matchCombinations = generateMatchCombinations(targetNumberSigns);

                let matchedRows = rows.slice(1).filter(row => {
                    const cells = row.split(',');
                    const numberSign1 = cells[numberSignIndex1]?.trim();
                    const numberSign2 = cells[numberSignIndex2]?.trim();
                    return matchCombinations.some(
                        ([sign1, sign2]) => (numberSign1 === sign1 && numberSign2 === sign2) || (numberSign1 === sign2 && numberSign2 === sign1)
                    );
                });

                if (matchedRows.length === 0) {
                    console.warn(`第 ${groupIndex + 1} 組無比賽數據`);
                    return;
                }

                const teamPoints = calculateTeamPoints(matchedRows);
                const sortedTeams = Array.from(teamPoints.entries()).sort((a, b) => b[1] - a[1]);

                groupRankings.push(sortedTeams.map(([team, points]) => ({ team, points })));

                if (sortedTeams.length > 0) {
                    firstPlaceTeams.push(sortedTeams[0][0]);
                } else {
                    firstPlaceTeams.push('無隊伍');
                }

                // 顯示四角形或三角形比賽的 HTML
                const matchContainer = document.createElement('li');
                matchContainer.classList.add(targetNumberSigns.length === 3 ? 'triangle' : 'rectangle');

                if (targetNumberSigns.length === 3) {
                    // 三角形比賽結構
                    matchContainer.innerHTML = `
                        <div class="team top">${sortedTeams[0] ? sortedTeams[0][0] : '隊伍未找到'}</div>
                        <div class="team left">${sortedTeams[1] ? sortedTeams[1][0] : '隊伍未找到'}</div>
                        <div class="team right">${sortedTeams[2] ? sortedTeams[2][0] : '隊伍未找到'}</div>
                        <div class="score top" id="score${groupIndex * 100 + 1}"></div>
                        <div class="score left" id="score${groupIndex * 100 + 2}"></div>
                        <div class="score right" id="score${groupIndex * 100 + 3}"></div>
                    `;
                } else {
                    // 四角形比賽結構
                    matchContainer.innerHTML = `
                        <div class="team top-left" id="team${groupIndex * 100 + 1}">${sortedTeams[0] ? sortedTeams[0][0] : '隊伍未找到'}</div>
                        <div class="team top-right" id="team${groupIndex * 100 + 2}">${sortedTeams[1] ? sortedTeams[1][0] : '隊伍未找到'}</div>
                        <div class="team bottom-left" id="team${groupIndex * 100 + 3}">${sortedTeams[2] ? sortedTeams[2][0] : '隊伍未找到'}</div>
                        <div class="team bottom-right" id="team${groupIndex * 100 + 4}">${sortedTeams[3] ? sortedTeams[3][0] : '隊伍未找到'}</div>

                        <div class="team center-top" id="score${groupIndex * 100 + 1}"></div>
                        <div class="team center-bottom" id="score${groupIndex * 100 + 2}"></div>
                        <div class="team topscore-left" id="score${groupIndex * 100 + 3}"></div>
                        <div class="team topscore-right" id="score${groupIndex * 100 + 4}"></div>
                        <div class="team center-left" id="score${groupIndex * 100 + 5}"></div>
                        <div class="team center-right" id="score${groupIndex * 100 + 6}"></div>
                    `;
                }

                mainContainer.appendChild(matchContainer);

                // 填入比分資料
                matchedRows.forEach((row, index) => {
                    const cells = row.split(',');
                    const score1 = cells[score1Index]?.trim();
                    const score2 = cells[score2Index]?.trim();
                    const scoreElement = document.getElementById(`score${groupIndex * 100 + index + 1}`);
                    if (scoreElement) {
                        scoreElement.innerHTML = `<span>${score1}</span> : <span>${score2}</span>`;
                    }
                });
            });

            // 顯示小組賽名次
            const rankingsContainer = document.createElement('div');
            rankingsContainer.innerHTML = `<h2>小組賽名次</h2>`;
            mainContainer.appendChild(rankingsContainer);

            groupRankings.forEach((group, groupIndex) => {
                const groupRanking = document.createElement('div');
                groupRanking.innerHTML = `<h3>第 ${groupIndex + 1} 組</h3><ul>${group
                    .map((team, index) => `<li>${index + 1} 名: ${team.team} - 積分: ${team.points}</li>`)
                    .join('')}</ul>`;
                rankingsContainer.appendChild(groupRanking);
            });

            // 顯示小組對戰表
            const knockoutContainer = document.createElement('div');
            knockoutContainer.innerHTML = `<h2>小組對戰表</h2>`;
            mainContainer.appendChild(knockoutContainer);

            function createMatchElement(text) {
                const p = document.createElement('p');
                p.textContent = text;
                knockoutContainer.appendChild(p);
            }

            // 使用 createMatchElement 來創建對戰表並顯示比分
            createMatchElement(`H1: ${firstPlaceTeams[7]} vs I1: ${firstPlaceTeams[8]}`);
            createMatchElement(`J1: ${firstPlaceTeams[9]} vs G1: ${firstPlaceTeams[6]}`);
            createMatchElement(`A1: ${firstPlaceTeams[0]} vs E1: ${firstPlaceTeams[4]}`);
            createMatchElement(`場次46勝: ${match46Winner || '尚未決定'} (${match46Score || '尚未決定'}) vs D1: ${firstPlaceTeams[3]}`);
            createMatchElement(`C1: ${firstPlaceTeams[2]} vs 場次47勝: ${match47Winner || '尚未決定'} (${match47Score || '尚未決定'})`);
            createMatchElement(`F1: ${firstPlaceTeams[5]} vs B1: ${firstPlaceTeams[1]}`);
        })
        .catch(error => console.error('Error fetching the CSV file:', error));
});
