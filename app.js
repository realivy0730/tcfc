const app = Vue.createApp({
    data() {
        return {
            rectangleGroups: [], // 四角形比賽數據
            triangleGroups: [],  // 三角形比賽數據
            groupRankings: {},   // 每組排名（小組賽名次）
            // 隊伍CSS類別
            teamClasses: ['team top-left', 'team top-right', 'team bottom-left', 'team bottom-right'], 
            scoreClasses: ['score top-center', 'score bottom-center', 'score left-center', 'score right-center'], 
            diagonalClasses: ['diagonal-score top-left-bottom-right', 'diagonal-score top-right-bottom-left'], 
            triangleTeamClasses: ['team top', 'team bottom-left', 'team bottom-right'],
            triangleScoreClasses: ['score top', 'score bottom-left', 'score bottom-right']
        };
    },
    mounted() {
        this.fetchRectangleData().then(() => {
            this.fetchTriangleData().then(() => {
                this.calculateGroupRankings(); // 計算小組賽名次
            });
        });
    },
    methods: {
        fetchRectangleData() {
            const csvUrl = 'https://docs.google.com/spreadsheets/d/1wqtBfW1dsLAvWgvUc9e_uYG0sI27RU7akz3zMdTSwP8/pub?gid=0&single=true&output=csv';
            return fetch(csvUrl)
                .then(response => response.text())
                .then(data => {
                    const rows = data.split('\n').filter(row => row.trim().length > 0);
                    const header = rows[0].split(',');

                    // 取得欄位的索引
                    const numberSignIndex1 = header.indexOf('數字籤');
                    const team1Index = header.indexOf('比賽球隊');
                    const score1Index = header.indexOf('分數');
                    const score2Index = header.lastIndexOf('分數');
                    const team2Index = header.lastIndexOf('比賽球隊');
                    const numberSignIndex2 = header.lastIndexOf('數字籤');

                    // 定義四角形比賽數字籤組
                    const rectangleNumberSigns = [
                        ['1', '2', '3', '4'], 
                        ['5', '6', '7', '8'],
                        ['9', '10', '11', '12'],
                        ['13', '14', '15', '16'],
                        ['17', '18', '19', '20']
                    ];

                    this.rectangleGroups = rectangleNumberSigns.map((targetNumberSigns) => {
                        return this.extractMatchData(rows, targetNumberSigns, numberSignIndex1, team1Index, score1Index, score2Index, team2Index, numberSignIndex2);
                    });
                })
                .catch(error => console.error('Error fetching rectangle data:', error));
        },

        fetchTriangleData() {
            const csvUrl = 'https://docs.google.com/spreadsheets/d/1wqtBfW1dsLAvWgvUc9e_uYG0sI27RU7akz3zMdTSwP8/pub?gid=0&single=true&output=csv';
            return fetch(csvUrl)
                .then(response => response.text())
                .then(data => {
                    const rows = data.split('\n').filter(row => row.trim().length > 0);
                    const header = rows[0].split(',');

                    // 取得欄位的索引
                    const numberSignIndex1 = header.indexOf('數字籤');
                    const team1Index = header.indexOf('比賽球隊');
                    const score1Index = header.indexOf('分數');
                    const score2Index = header.lastIndexOf('分數');
                    const team2Index = header.lastIndexOf('比賽球隊');
                    const numberSignIndex2 = header.lastIndexOf('數字籤');

                    // 定義三角形比賽數字籤組
                    const triangleNumberSigns = [
                        ['21', '22', '23'],    
                        ['24', '25', '26'],
                        ['27', '28', '29'],
                        ['30', '31', '32'],
                        ['33', '34', '35']
                    ];

                    this.triangleGroups = triangleNumberSigns.map((targetNumberSigns) => {
                        return this.extractMatchData(rows, targetNumberSigns, numberSignIndex1, team1Index, score1Index, score2Index, team2Index, numberSignIndex2);
                    });
                })
                .catch(error => console.error('Error fetching triangle data:', error));
        },

        // 提取比賽數據
        extractMatchData(rows, targetNumberSigns, numberSignIndex1, team1Index, score1Index, score2Index, team2Index, numberSignIndex2) {
            let matchedRows = rows.slice(1).filter(row => {
                const cells = row.split(',');
                const numberSign1 = cells[numberSignIndex1]?.trim();
                const numberSign2 = cells[numberSignIndex2]?.trim();
                return targetNumberSigns.includes(numberSign1) || targetNumberSigns.includes(numberSign2);
            });

            const teamMap = new Map();
            const scores = [];

            matchedRows.forEach(row => {
                const cells = row.split(',');
                const numberSign1 = cells[numberSignIndex1]?.trim();
                const team1 = cells[team1Index]?.trim();
                const numberSign2 = cells[numberSignIndex2]?.trim();
                const team2 = cells[team2Index]?.trim();
                const score1 = cells[score1Index]?.trim();
                const score2 = cells[score2Index]?.trim();

                if (numberSign1 && team1) teamMap.set(numberSign1, team1);
                if (numberSign2 && team2) teamMap.set(numberSign2, team2);

                scores.push({
                    team1,
                    score1: score1 || '0',
                    team2,
                    score2: score2 || '0'
                });
            });

            return {
                numberSigns: targetNumberSigns,
                teams: Array.from(teamMap.values()),
                scores: scores
            };
        },

        // 計算小組賽的名次
        calculateGroupRankings() {
            const allGroups = [...this.rectangleGroups, ...this.triangleGroups];
            const groupRankings = {};

            allGroups.forEach((group, index) => {
                const groupTeams = group.teams.map(team => ({
                    team,
                    points: 0, // 初始化積分
                    goalsFor: 0, // 進球數
                    goalsAgainst: 0 // 失球數
                }));

                group.scores.forEach(score => {
                    const team1 = groupTeams.find(t => t.team === score.team1);
                    const team2 = groupTeams.find(t => t.team === score.team2);
                    const goals1 = parseInt(score.score1) || 0;
                    const goals2 = parseInt(score.score2) || 0;

                    if (team1 && team2) {
                        // 更新積分和進失球數
                        team1.goalsFor += goals1;
                        team1.goalsAgainst += goals2;
                        team2.goalsFor += goals2;
                        team2.goalsAgainst += goals1;

                        if (goals1 > goals2) {
                            team1.points += 3; // 勝者得3分
                        } else if (goals2 > goals1) {
                            team2.points += 3; // 勝者得3分
                        } else {
                            team1.points += 1; // 平局各得1分
                            team2.points += 1; // 平局各得1分
                        }
                    }
                });

                // 根據積分排序
                groupTeams.sort((a, b) => b.points - a.points || (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst));

                groupRankings[`Group ${index + 1}`] = groupTeams;
            });

            this.groupRankings = groupRankings;
        }
    }
});

app.mount('#app');
