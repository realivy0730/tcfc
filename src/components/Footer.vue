<template>
    <footer class="footer">
        <div class="footer-content">
            <!-- 關於我們區塊 -->
            <div class="footer-section">
                <h2>About Us</h2>
                <div class="green-line"></div>
                <p class="about-text">
                    臺中市體育總會足球委員會致力於推廣足球運動，
                    提供優質的訓練環境與比賽機會，促進臺中市足球運動發展。
                </p>
                <div class="social-links">


                    <a href="https://www.facebook.com/groups/576604161850781" target="_blank" class="social-icon">
                        <i class="fab fa-facebook-f" aria-label="Facebook"></i>
                    </a>
                    <a href="https://line.me/ti/p/@677ciirx" target="_blank" class="social-icon">
                        <i class="fab fa-line" aria-label="Line"></i>
                    </a>
                    <a href="mailto:service@tcfc.org.tw" class="social-icon">
                        <i class="fas fa-envelope" aria-label="Email"></i>
                    </a>

                </div>
            </div>

            <!-- 快速連結區塊 -->
            <div class="footer-section">
                <h2>Quick Links</h2>
                <div class="green-line"></div>
                <ul class="footer-links">
                    <li><a href="javascript:void(0)">組織簡介</a></li>
                    <li><a href="javascript:void(0)">願景與使命</a></li>
                    <li><a href="javascript:void(0)">組織架構</a></li>
                    <li><a href="javascript:void(0)">主席簡介</a></li>
                    <li><a href="javascript:void(0)">地方聯絡窗口</a></li>
                </ul>
            </div>

            <!-- 服務項目區塊 -->
            <div class="footer-section">
                <h2>Services</h2>
                <div class="green-line"></div>
                <ul class="footer-links">
                    <li><a href="javascript:void(0)">規章制度</a></li>
                    <li><a href="javascript:void(0)">財務報告</a></li>
                    <li><a href="javascript:void(0)">會議紀錄</a></li>
                    <li><a href="javascript:void(0)">活動資訊</a></li>
                    <li><a href="javascript:void(0)">比賽公告</a></li>
                </ul>
            </div>

            <!-- 聯絡資訊區塊 -->
            <div class="footer-section">
                <h2>Contact Information</h2>
                <div class="green-line"></div>
                <div class="contact-info">
                    <p><i class="fas fa-phone gold-icon"></i> (04) 1234-5678</p>
                    <p><i class="fas fa-envelope gold-icon"></i> service@tcfc.org.tw</p>
                    <p><i class="fas fa-map-marker-alt gold-icon"></i> 臺中市北區雙十路一段 1 號</p>
                </div>

            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; 2025© TCFC 臺中市體育總會足球委員會</p>

        </div>
    </footer>
</template>

<style scoped>
.footer {
    background-color: #1f1f17;
    padding: 60px 0 20px;
    color: #ffffff;
}

.footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
    padding: 0 20px;
}

.footer-section h2 {
    font-size: 24px;
    margin-bottom: 15px;
    color: #ffffff;
}

.green-line {
    width: 40px;
    height: 3px;
    background-color: #1ABC9C;
    margin-bottom: 20px;
}

.about-text {
    margin-bottom: 20px;
    line-height: 1.6;
}

.social-links {
    display: flex;
    gap: 15px;
}

.social-icon {
    background-color: #1ABC9C;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: background-color 0.3s;
}

.social-icon:hover {
    background-color: #1ABC9C;
}

.footer-links {
    list-style: none;
    padding: 0;
}

.footer-links li {
    margin-bottom: 12px;
}

.footer-links a {
    color: #ffffff;
    text-decoration: none;
    transition: color 0.3s;
    display: flex;
    align-items: center;
}

.footer-links a:before {
    content: "›";
    margin-right: 10px;
    color: #1ABC9C;
}

.footer-links a:hover {
    color: #1ABC9C;
}

.contact-info p {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
}

.gold-icon {
    color: #ffd700;
    margin-right: 10px;
    width: 20px;
}

.newsletter {
    display: flex;
    margin-top: 20px;
}

.email-input {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 25px 0 0 25px;
}

.submit-btn {
    background-color: #1ABC9C;
    border: none;
    color: white;
    padding: 10px 20px;
    border-radius: 0 25px 25px 0;
    cursor: pointer;
    transition: background-color 0.3s;
}

.submit-btn:hover {
    background-color: #1ABC9C;
}

.footer-bottom {
    max-width: 1200px;
    margin: 40px auto 0;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    padding: 20px;
}

@media (max-width: 1024px) {
    .footer-content {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .footer-content {
        grid-template-columns: 1fr;
    }

    .footer-bottom {
        flex-direction: column;
        text-align: center;
        gap: 10px;
    }
}
</style>
