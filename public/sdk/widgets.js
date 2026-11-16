/**
 * GamifyWidgets — 1:1 Screen-Recording-Accurate Widget Renderer
 * Renders all extracted gamification widgets cleanly into any DOM element with full live customization.
 */
(function (window, document) {
  'use strict';

  function injectSharedStyles() {
    if (document.getElementById('gamify-widgets-css')) return;
    const style = document.createElement('style');
    style.id = 'gamify-widgets-css';
    style.textContent = `
      .gw-phone-frame {
        width: 340px;
        min-height: 540px;
        border-radius: 32px;
        overflow: hidden;
        position: relative;
        box-shadow: 0 24px 64px rgba(0, 0, 0, 0.65), 0 0 0 6px #1B2030;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        user-select: none;
        display: flex;
        flex-direction: column;
      }
      .gw-btn-press:active { transform: translateY(2px) scale(0.985); }
      @keyframes gwSunburstSpin {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to { transform: translate(-50%, -50%) rotate(360deg); }
      }
      @keyframes gwFloatCoin {
        0%, 100% { transform: translateY(0px) scale(1); }
        50% { transform: translateY(-7px) scale(1.03); }
      }
      @keyframes gwPointHand {
        0%, 100% { transform: translate(0, 0) rotate(-6deg); }
        50% { transform: translate(8px, -4px) rotate(4deg); }
      }
      @keyframes gwToastSlide {
        0% { transform: translateY(-70px); opacity: 0; }
        12%, 85% { transform: translateY(0); opacity: 1; }
        100% { transform: translateY(-70px); opacity: 0; }
      }
      @keyframes gwStarburstExpand {
        0% { transform: translate(-50%, -50%) scale(0.05) rotate(0deg); opacity: 1; }
        55% { transform: translate(-50%, -50%) scale(3.4) rotate(25deg); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(4.2) rotate(35deg); opacity: 0; }
      }
      @keyframes gwCoinFly {
        0% { transform: translate(0, 0) scale(0.6); opacity: 1; }
        45% { transform: translate(var(--tx-mid), -110px) scale(1.1); opacity: 1; }
        100% { transform: translate(var(--tx-end), -240px) scale(0.45); opacity: 0; }
      }
      @keyframes gwPopIn {
        0% { transform: scale(0.5); opacity: 0; }
        70% { transform: scale(1.08); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes gwBubbleRise {
        0% { transform: translateY(0) scale(0.8); opacity: 0.7; }
        100% { transform: translateY(-90px) scale(1.2); opacity: 0; }
      }
      .gw-replay-chip {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 60;
        background: rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(6px);
        border: 1px solid rgba(255, 255, 255, 0.18);
        color: #FFF;
        font-size: 10px;
        font-weight: 700;
        padding: 4px 9px;
        border-radius: 12px;
        cursor: pointer;
      }
      .gw-replay-chip:hover { background: rgba(0, 0, 0, 0.8); }
    `;
    document.head.appendChild(style);
  }

  function fireConfetti(colors) {
    if (typeof window.confetti === 'function') {
      window.confetti({
        particleCount: 75,
        spread: 75,
        origin: { y: 0.55 },
        colors: colors || ['#FFC800', '#00E599', '#1CB0F6', '#FF4B4B']
      });
    }
  }

  // =========================================================================
  // 1. ZEPTO SCRATCH CARD (ScreenRecording_11-09-2026 21-26-22_1.mp4)
  // =========================================================================
  function renderZeptoScratch(mount, widget, ctx) {
    const c = widget.config;
    const snd = ctx.sound;

    mount.innerHTML = `
      <div class="gw-phone-frame" style="background: radial-gradient(circle at 50% 25%, #2B1347, #0D0916 80%); padding: 24px 20px; justify-content: center; align-items: center;">
        <button class="gw-replay-chip" id="zeptoResetBtn"><i class="fa-solid fa-rotate-right"></i> Reset</button>

        <div style="text-align: center; margin-bottom: 20px;">
          <div style="font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.85); margin-bottom: 4px;">${c.headerEyebrow || 'Congratulations'}</div>
          <div style="font-size: 22px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.4px;">${c.headerTitle || 'Get Your Reward Inside!'}</div>
        </div>

        <!-- Card Outer Purple Frame -->
        <div style="position: relative; width: 256px; height: 256px; border-radius: 24px; background: linear-gradient(180deg, ${c.foilTopColor || '#D96BFF'}, ${c.foilBottomColor || '#7E35C6'}); padding: 14px; box-shadow: 0 20px 50px rgba(126, 53, 198, 0.45);">
          <!-- Revealed White Card Underneath -->
          <div style="width: 100%; height: 100%; background: #FFFFFF; border-radius: 16px; padding: 16px 14px; display: flex; flex-direction: column; align-items: center; justify-content: space-between; text-align: center;">
            <div style="background: #14141F; color: #FFFFFF; font-size: 14px; font-weight: 900; padding: 6px 14px; border-radius: 10px; letter-spacing: 0.3px;">
              ${c.brandBadge || 'uni•'}
            </div>

            <div>
              <div style="font-size: 16px; font-weight: 800; color: #161622; line-height: 1.25;">${c.rewardTitle || 'Lifetime Free Rupay Card'}</div>
              <div style="font-size: 11px; color: #475569; margin-top: 4px; font-weight: 500;">${c.rewardSubtitle || '5% back on Zepto + 1% back on UPI!'}</div>
              <div style="font-size: 10px; color: #94A3B8; margin-top: 2px;">${c.rewardFootnote || 'No minimum spends'}</div>
            </div>

            <div style="width: 100%; border: 1.5px dashed #CBD5E1; background: #F8FAFC; border-radius: 10px; padding: 7px 10px; font-size: 11px; font-weight: 800; color: #334155; letter-spacing: 0.6px;">
              ${c.couponCode || 'NO CODE NEEDED'}
            </div>

            <div style="font-size: 11px; color: #64748B; text-decoration: underline; cursor: pointer;">Know more to claim</div>
          </div>

          <!-- Scratch Foil Canvas -->
          <canvas id="zeptoCanvas" width="256" height="256" style="position: absolute; top: 0; left: 0; border-radius: 24px; cursor: crosshair; z-index: 10; transition: opacity 0.3s ease;"></canvas>

          <!-- Sparkle stars on reveal -->
          <div id="zeptoSparkles" style="display: none; position: absolute; inset: -12px; pointer-events: none; z-index: 20;">
            <span style="position: absolute; top: 0; left: 20px; font-size: 18px; color: #FFC800; animation: gwPopIn 0.4s ease;">✦</span>
            <span style="position: absolute; top: 14px; right: 10px; font-size: 16px; color: #FFF; animation: gwPopIn 0.5s ease;">✦</span>
            <span style="position: absolute; bottom: 20px; left: 8px; font-size: 14px; color: #D96BFF; animation: gwPopIn 0.5s ease;">✦</span>
          </div>
        </div>

        <!-- Bottom CTA Button (Appears on reveal) -->
        <button id="zeptoClaimBtn" class="gw-btn-press" style="margin-top: 22px; width: 256px; height: 48px; border-radius: 14px; border: none; background: ${c.ctaColor || '#F93262'}; color: #FFFFFF; font-size: 15px; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; opacity: 0; transform: translateY(10px); pointer-events: none; transition: all 0.3s ease; box-shadow: 0 8px 24px rgba(249, 50, 98, 0.45);">
          <i class="fa-solid fa-gift"></i> ${c.ctaText || 'Claim now'}
        </button>
      </div>
    `;

    const canvas = mount.querySelector('#zeptoCanvas');
    const zctx = canvas.getContext('2d');
    const claimBtn = mount.querySelector('#zeptoClaimBtn');
    const sparkles = mount.querySelector('#zeptoSparkles');
    let revealed = false;
    let drawing = false;
    let strokes = 0;

    function drawFoil() {
      revealed = false;
      strokes = 0;
      canvas.style.opacity = '1';
      canvas.style.pointerEvents = 'auto';
      sparkles.style.display = 'none';
      claimBtn.style.opacity = '0';
      claimBtn.style.transform = 'translateY(10px)';
      claimBtn.style.pointerEvents = 'none';

      zctx.globalCompositeOperation = 'source-over';
      const grad = zctx.createLinearGradient(0, 0, 0, 256);
      grad.addColorStop(0, c.foilTopColor || '#DF7DFF');
      grad.addColorStop(1, c.foilBottomColor || '#8E43D4');
      zctx.fillStyle = grad;
      zctx.fillRect(0, 0, 256, 256);

      // Subtle decorative confetti dots/arcs on foil
      zctx.fillStyle = 'rgba(255, 255, 255, 0.14)';
      [[30, 35, 6], [220, 42, 5], [215, 190, 7], [40, 215, 5], [175, 215, 4]].forEach(([x, y, r]) => {
        zctx.beginPath();
        zctx.arc(x, y, r, 0, Math.PI * 2);
        zctx.fill();
      });

      // Typography "Scratch HERE"
      zctx.fillStyle = '#FFFFFF';
      zctx.textAlign = 'center';
      zctx.font = 'italic 900 40px Georgia, serif';
      zctx.fillText('Scratch', 132, 86);
      zctx.font = '900 32px -apple-system, sans-serif';
      zctx.fillText('HERE', 162, 122);

      // Pointing hand illustration on left
      zctx.fillStyle = 'rgba(255,255,255,0.22)';
      zctx.fillRect(24, 118, 72, 68);
      zctx.font = '38px sans-serif';
      zctx.fillText('👉', 66, 152);

      // Subtle watermark at bottom
      zctx.fillStyle = 'rgba(255,255,255,0.45)';
      zctx.font = '800 18px sans-serif';
      zctx.fillText(c.brandWatermark || 'zepto', 128, 224);
    }

    function scratchAt(x, y) {
      if (revealed) return;
      zctx.globalCompositeOperation = 'destination-out';
      zctx.beginPath();
      zctx.arc(x, y, 26, 0, Math.PI * 2);
      zctx.fill();
      if (c.soundEnabled !== false) snd.playScratchFoil();

      strokes++;
      const needed = Math.max(12, Math.round((c.scratchThresholdPercent || 45) * 0.75));
      if (strokes >= needed && !revealed) {
        revealed = true;
        canvas.style.opacity = '0';
        canvas.style.pointerEvents = 'none';
        sparkles.style.display = 'block';
        claimBtn.style.opacity = '1';
        claimBtn.style.transform = 'translateY(0)';
        claimBtn.style.pointerEvents = 'auto';
        if (c.soundEnabled !== false) snd.playRewardChime();
        fireConfetti(['#D96BFF', '#F93262', '#FFC800', '#FFFFFF']);
        ctx.emit('zepto_scratch_revealed', { widgetId: widget.id });
      }
    }

    drawFoil();

    canvas.onmousedown = (e) => { drawing = true; scratchAt(e.offsetX, e.offsetY); };
    canvas.onmousemove = (e) => { if (drawing) scratchAt(e.offsetX, e.offsetY); };
    window.addEventListener('mouseup', () => { drawing = false; });

    canvas.ontouchstart = (e) => {
      e.preventDefault();
      drawing = true;
      const r = canvas.getBoundingClientRect();
      scratchAt(e.touches[0].clientX - r.left, e.touches[0].clientY - r.top);
    };
    canvas.ontouchmove = (e) => {
      e.preventDefault();
      if (!drawing) return;
      const r = canvas.getBoundingClientRect();
      scratchAt(e.touches[0].clientX - r.left, e.touches[0].clientY - r.top);
    };
    canvas.ontouchend = () => { drawing = false; };

    mount.querySelector('#zeptoResetBtn').onclick = drawFoil;
    claimBtn.onclick = () => {
      if (c.soundEnabled !== false) snd.playToastPop();
      claimBtn.innerHTML = `<i class="fa-solid fa-check"></i> Claimed!`;
      ctx.emit('zepto_reward_claimed', { widgetId: widget.id });
    };
  }

  // =========================================================================
  // 2. MYNAKSH DAILY CHECK-IN & REWARDS HUB (1:1 with Screenshot & Recording)
  // =========================================================================
  function renderMynakshCheckin(mount, widget, ctx) {
    const c = widget.config;
    const snd = ctx.sound;
    const cur = c.currencySymbol || '₹';
    const rewards = Array.isArray(c.dayRewards) ? c.dayRewards : [5, 7, 9, 11, 13, 15, 17];
    let activeDay = Math.min(Math.max(1, Number(c.activeDay || 1)), 7);
    let walletBalance = Number(c.walletBalance || 30);
    let mantraClaimed = false;
    let viewState = c.initialView || 'rewards_hub'; // 'rewards_hub' | 'celebrate' | 'modal'

    function renderView() {
      if (viewState === 'celebrate') {
        const earned = rewards[activeDay - 1] ?? 5;
        mount.innerHTML = `
          <div class="gw-phone-frame" style="background: rgba(8, 11, 20, 0.96); justify-content: center; align-items: center; padding: 24px; text-align: center; position: relative; overflow: hidden;">
            <button id="mnCloseCel" style="position: absolute; top: 18px; right: 18px; width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.14); border: none; color: #FFF; font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center;">&times;</button>

            <div style="position: relative; width: 160px; height: 160px; margin: 0 auto 16px;">
              <!-- Rotating Golden Sunburst Rays -->
              <div style="position: absolute; top: -30px; left: -30px; width: 220px; height: 220px; border-radius: 50%; background: repeating-conic-gradient(from 0deg, rgba(251, 191, 36, 0.32) 0deg 12deg, transparent 12deg 24deg); -webkit-mask-image: radial-gradient(circle, black 35%, transparent 72%); animation: gwSunburstSpin 14s linear infinite;"></div>
              
              <!-- Floating 3D Gold Coin with Glow -->
              <div style="position: relative; z-index: 2; width: 120px; height: 120px; margin: 20px auto; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #FEF08A 0%, #F59E0B 55%, #B45309 100%); border: 5px solid #FDE68A; box-shadow: 0 14px 40px rgba(245, 158, 11, 0.7); display: flex; align-items: center; justify-content: center; animation: gwFloatCoin 2.4s ease-in-out infinite;">
                <img src="/assets/mynaksh/wincoin.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" style="width: 100px; height: 100px; object-fit: contain;" alt="Coin" />
                <span style="display: none; font-size: 58px; font-weight: 900; color: #78350F; text-shadow: 0 2px 0 rgba(255,255,255,0.6);">${cur}</span>
              </div>
            </div>

            <div style="font-size: 24px; font-weight: 900; color: #FFFFFF; margin-bottom: 6px; letter-spacing: -0.3px; animation: gwPopIn 0.35s ease;">
              ${activeDay} Day Streak!
            </div>
            <div style="font-size: 16px; font-weight: 800; color: #FACC15; margin-bottom: 8px;">
              You earned ${cur}${earned} today
            </div>
            <div style="font-size: 12.5px; color: #94A3B8; max-width: 250px; line-height: 1.45; margin: 0 auto 26px;">
              Collect your daily reward and keep your streak going.
            </div>

            <button id="mnOkBtn" class="gw-btn-press" style="width: 150px; height: 44px; border-radius: 22px; border: none; background: rgba(255, 255, 255, 0.22); color: #FFFFFF; font-size: 14.5px; font-weight: 800; cursor: pointer; transition: background 0.2s;">
              OK
            </button>
          </div>
        `;

        const goHub = () => {
          if (c.soundEnabled !== false) snd.playToastPop();
          viewState = 'rewards_hub';
          renderView();
        };
        mount.querySelector('#mnOkBtn').onclick = goHub;
        mount.querySelector('#mnCloseCel').onclick = goHub;

      } else if (viewState === 'modal') {
        // Bottom Sheet modal view
        const makeDayBox = (idx) => {
          const dayNum = idx + 1;
          const isDone = dayNum < activeDay;
          const isToday = dayNum === activeDay;
          const amt = rewards[idx] ?? 5;
          const border = isToday ? `2px solid ${c.highlightColor || '#22C55E'}` : '1px solid #EAE5DC';
          const bg = isToday ? '#FFFFFF' : '#F8F6F2';
          return `
            <div style="background: ${bg}; border: ${border}; border-radius: 14px; padding: 10px 4px; display: flex; flex-direction: column; align-items: center; gap: 6px; ${isToday ? 'box-shadow: 0 0 10px rgba(34, 197, 94, 0.35);' : ''}">
              <span style="font-size: 10.5px; color: #64748B; font-weight: 600;">Day ${dayNum}</span>
              <span style="font-size: 13.5px; font-weight: 800; color: #1E293B;">${cur}${amt}</span>
              <div style="width: 24px; height: 24px; border-radius: 50%; background: ${isToday ? 'linear-gradient(135deg, #FBBF24, #D97706)' : isDone ? '#22C55E' : '#CBD5E1'}; color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 900;">${isDone ? '✓' : isToday ? '★' : '+'}</div>
            </div>
          `;
        };

        mount.innerHTML = `
          <div class="gw-phone-frame" style="background: #EFE9DF; justify-content: flex-end; position: relative;">
            <button class="gw-replay-chip" id="mnSwitchHubToPage" style="z-index: 10;"><i class="fa-solid fa-mobile-screen"></i> Rewards Page</button>
            
            <div style="padding: 18px 18px 0; opacity: 0.45;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                <span style="font-size: 16px; font-weight: 800; color: #1E1B18;">Namaste Ankush</span>
                <span style="background: #1C1917; color: #FFF; padding: 4px 10px; border-radius: 14px; font-size: 11px; font-weight: 700;">Wallet ${cur}${walletBalance} +</span>
              </div>
              <div style="height: 60px; background: #141210; border-radius: 14px;"></div>
            </div>

            <!-- White Rounded Bottom Sheet -->
            <div style="background: #FFFFFF; border-radius: 26px 26px 0 0; padding: 22px 18px 24px; box-shadow: 0 -10px 40px rgba(0,0,0,0.22); animation: gwSlideUp 0.35s ease;">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 18px;">
                <div style="width: 42px; height: 42px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #FDE047, #F59E0B 60%, #B45309 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4); flex-shrink: 0;">
                  <img src="/assets/mynaksh/dailystreakcardicon.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" style="width: 30px; height: 30px; object-fit: contain;" />
                  <span style="display: none; font-size: 20px; color: #FFF; font-weight: 900;">${cur}</span>
                </div>
                <div>
                  <div style="font-size: 17px; font-weight: 800; color: #111827;">${c.title || 'Daily check-in'}</div>
                  <div style="font-size: 12px; color: #6B7280;">${c.subtitle || 'Collect your daily rewards here'}</div>
                </div>
              </div>

              <!-- Row 1: Days 1-4 -->
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 8px;">
                ${[0, 1, 2, 3].map(makeDayBox).join('')}
              </div>
              <!-- Row 2: Days 5-7 Centered -->
              <div style="display: grid; grid-template-columns: repeat(3, 76px); justify-content: center; gap: 8px; margin-bottom: 20px;">
                ${[4, 5, 6].map(makeDayBox).join('')}
              </div>

              <button id="mnClaimModalBtn" class="gw-btn-press" style="width: 100%; height: 48px; border-radius: 24px; border: none; background: ${c.ctaColor || '#0E6B38'}; color: #FFFFFF; font-size: 14.5px; font-weight: 800; cursor: pointer; box-shadow: 0 6px 18px rgba(14, 107, 56, 0.35);">
                ${c.ctaText || "Claim Today's Reward"}
              </button>
            </div>
          </div>
        `;

        mount.querySelector('#mnClaimModalBtn').onclick = () => {
          if (c.soundEnabled !== false) snd.playCoinCascade(6);
          viewState = 'celebrate';
          renderView();
          fireConfetti(['#FBBF24', '#22C55E', '#FFFFFF']);
          ctx.emit('mynaksh_streak_claimed', { widgetId: widget.id, day: activeDay, amount: rewards[activeDay - 1] });
        };
        mount.querySelector('#mnSwitchHubToPage').onclick = () => { viewState = 'rewards_hub'; renderView(); };

      } else {
        // =====================================================================
        // FULL 1:1 REWARDS SCREEN (Identical to User Screenshot & Native App)
        // =====================================================================
        const nextAmt = rewards[Math.min(activeDay, 6)] ?? 7;

        // Generate 7-Day capsules exactly matching screenshot
        const dayPills = rewards.map((amt, idx) => {
          const d = idx + 1;
          const isClaimedToday = d === 1; // In screenshot Day 1 is claimed with green border
          const isDay2 = d === 2; // Next upcoming
          
          if (isClaimedToday) {
            return `
              <div class="mn-day-col" style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
                <span style="font-size: 10.5px; font-weight: 700; color: #FFFFFF;">Day ${d}</span>
                <div id="mnDayCard1" class="gw-btn-press" style="width: 100%; height: 70px; background: #FFFFFF; border: 2.2px solid #22C55E; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; box-shadow: 0 0 12px rgba(34, 197, 94, 0.45); cursor: pointer;">
                  <!-- Gold circle with checkmark badge -->
                  <div style="width: 24px; height: 24px; border-radius: 50%; background: linear-gradient(135deg, #FBBF24, #F59E0B); display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(245, 158, 11, 0.4);">
                    <div style="width: 16px; height: 16px; border-radius: 50%; background: #F97316; display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-size: 10px; font-weight: 900;">✓</div>
                  </div>
                  <span style="font-size: 13px; font-weight: 800; color: #0F172A;">${cur}${amt}</span>
                </div>
              </div>
            `;
          } else if (isDay2) {
            return `
              <div class="mn-day-col" style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
                <span style="font-size: 10.5px; font-weight: 600; color: #94A3B8;">Day ${d}</span>
                <div id="mnDayCard2" class="gw-btn-press" style="width: 100%; height: 70px; background: rgba(255, 255, 255, 0.1); border: 1.5px solid #22C55E; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; cursor: pointer;">
                  <img src="/assets/mynaksh/coinupcoming.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" style="width: 24px; height: 24px; object-fit: contain;" alt="Coin" />
                  <div style="display: none; width: 22px; height: 22px; border-radius: 50%; background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.3); align-items: center; justify-content: center; font-size: 10px; color: #E2E8F0;">★</div>
                  <span style="font-size: 12.5px; font-weight: 700; color: #E2E8F0;">${cur}${amt}</span>
                </div>
              </div>
            `;
          } else {
            return `
              <div class="mn-day-col" style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
                <span style="font-size: 10.5px; font-weight: 600; color: #64748B;">Day ${d}</span>
                <div style="width: 100%; height: 70px; background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; opacity: 0.82;">
                  <img src="/assets/mynaksh/dailystreakunclaimed.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" style="width: 22px; height: 22px; object-fit: contain; opacity: 0.6;" alt="Coin" />
                  <div style="display: none; width: 20px; height: 20px; border-radius: 50%; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); align-items: center; justify-content: center; font-size: 9px; color: #94A3B8;">★</div>
                  <span style="font-size: 12.5px; font-weight: 600; color: #94A3B8;">${cur}${amt}</span>
                </div>
              </div>
            `;
          }
        }).join('');

        mount.innerHTML = `
          <div class="gw-phone-frame" style="background: #070B16; padding: 0; display: flex; flex-direction: column; height: 680px; overflow-y: auto; overflow-x: hidden; scrollbar-width: none;">
            
            <!-- Top Controls (Switch views for demo) -->
            <div style="position: absolute; top: 8px; right: 8px; z-index: 50; display: flex; gap: 6px;">
              <button class="gw-replay-chip" id="mnTriggerCelebration" style="font-size: 10px; padding: 3px 8px;"><i class="fa-solid fa-wand-magic-sparkles"></i> Celebrate</button>
              <button class="gw-replay-chip" id="mnTriggerModal" style="font-size: 10px; padding: 3px 8px;"><i class="fa-solid fa-layer-group"></i> Modal</button>
            </div>

            <!-- iOS Top Status Bar -->
            <div style="padding: 10px 20px 4px; display: flex; justify-content: space-between; align-items: center; color: #FFFFFF; font-size: 12px; font-weight: 600;">
              <div style="display: flex; align-items: center; gap: 4px;">
                <span>8:52</span>
                <i class="fa-solid fa-location-arrow" style="font-size: 10px; transform: rotate(-45deg);"></i>
              </div>
              <div style="display: flex; align-items: center; gap: 6px; font-size: 11px;">
                <i class="fa-solid fa-signal"></i>
                <i class="fa-solid fa-wifi"></i>
                <i class="fa-solid fa-battery-full" style="font-size: 13px;"></i>
              </div>
            </div>

            <!-- Main Top Header: "Rewards" & "Wallet ₹30 +" -->
            <div style="padding: 10px 18px 16px; display: flex; justify-content: space-between; align-items: center;">
              <h1 style="color: #FFFFFF; font-size: 28px; font-weight: 800; letter-spacing: -0.6px; margin: 0; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">Rewards</h1>
              
              <!-- Wallet Pill Badge -->
              <div id="mnWalletBadge" class="gw-btn-press" style="background: #171C28; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 18px; padding: 5px 6px 5px 14px; display: flex; align-items: center; gap: 10px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.25);">
                <div style="display: flex; flex-direction: column; align-items: flex-start;">
                  <span style="font-size: 10px; color: #94A3B8; font-weight: 600; line-height: 1;">Wallet</span>
                  <span id="mnWalletVal" style="font-size: 15px; font-weight: 800; color: #FFFFFF; line-height: 1.2;">${cur}${walletBalance}</span>
                </div>
                <div id="mnAddFundsBtn" style="width: 24px; height: 24px; border-radius: 50%; background: #D9531E; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 900; box-shadow: 0 2px 6px rgba(217, 83, 30, 0.45);">+</div>
              </div>
            </div>

            <!-- Dark Streak Section: "Keep Your Streak Alive!" -->
            <div style="padding: 0 16px 18px; background: #070B16;">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
                <div style="width: 38px; height: 38px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #FDE047, #F59E0B 65%, #B45309 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.4); flex-shrink: 0;">
                  <img src="/assets/mynaksh/dailystreakcardicon.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" style="width: 28px; height: 28px; object-fit: contain;" alt="Streak Icon" />
                  <span style="display: none; font-size: 18px; color: #FFF; font-weight: 900;">${cur}</span>
                </div>
                <div>
                  <div style="font-size: 15px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.2px;">Keep Your Streak Alive!</div>
                  <div style="font-size: 11.5px; color: #94A3B8; margin-top: 2px;">Collect your daily rewards here</div>
                </div>
              </div>

              <!-- 7-Day Stepper Row -->
              <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; margin-bottom: 14px;">
                ${dayPills}
              </div>

              <!-- Button: "Get ₹7 more tomorrow" -->
              <button id="mnGetMoreBtn" class="gw-btn-press" style="width: 100%; height: 42px; border-radius: 21px; border: 1px solid rgba(255, 255, 255, 0.08); background: #252A36; color: #E2E8F0; font-size: 13.5px; font-weight: 600; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;">
                Get ${cur}${nextAmt} more tomorrow
              </button>
            </div>

            <!-- Warm Cream Page Body (Sand Tone Background) -->
            <div style="background: #EDE6DC; padding: 14px 12px 20px; display: flex; flex-direction: column; gap: 14px; flex: 1;">
              
              <!-- 1. "Refer a friend" Card -->
              <div style="background: linear-gradient(135deg, #FFE8D6 0%, #FFF5ED 50%, #FFFFFF 100%); border-radius: 20px; padding: 18px 16px; box-shadow: 0 4px 16px rgba(180, 130, 80, 0.08); position: relative; overflow: hidden;">
                <!-- Subtle decorative background dots -->
                <div style="position: absolute; right: 0; top: 0; bottom: 0; width: 120px; background-image: radial-gradient(#F59E0B 1px, transparent 1px); background-size: 12px 12px; opacity: 0.15; pointer-events: none;"></div>

                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <div style="z-index: 2; max-width: 60%;">
                    <div style="font-size: 16.5px; font-weight: 800; color: #1E1B18; line-height: 1.25;">Refer a friend</div>
                    <div style="font-size: 16.5px; font-weight: 800; color: #1E1B18; line-height: 1.25; display: flex; align-items: center; gap: 4px; margin-top: 3px;">
                      &amp; both earn <span style="display:inline-flex; width:16px; height:16px; border-radius:50%; background:#F59E0B; color:#FFF; font-size:9px; font-weight:900; align-items:center; justify-content:center; box-shadow: 0 1px 3px rgba(0,0,0,0.15);">★</span> ${cur}${c.referralBonus || 50}
                    </div>
                    <div id="mnHowReferralBtn" class="gw-btn-press" style="display: inline-flex; align-items: center; gap: 4px; margin-top: 9px; padding: 4px 10px; border-radius: 12px; border: 1px solid rgba(210, 140, 90, 0.35); background: rgba(255, 255, 255, 0.7); font-size: 11px; color: #78350F; font-weight: 600; cursor: pointer;">
                      How referral works &rsaquo;
                    </div>
                  </div>

                  <!-- 3D Stack of Golden Coins & Confetti Burst -->
                  <div style="position: relative; width: 100px; height: 75px; z-index: 2; display: flex; align-items: center; justify-content: center;">
                    <img src="/assets/mynaksh/wincoin.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" style="width: 76px; height: 76px; object-fit: contain; filter: drop-shadow(0 6px 12px rgba(245, 158, 11, 0.45));" alt="Coins" />
                    <!-- Fallback SVG Stack -->
                    <div style="display: none; width: 68px; height: 68px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #FDE047, #F59E0B 60%, #B45309 100%); box-shadow: 0 6px 16px rgba(245, 158, 11, 0.45);"></div>
                  </div>
                </div>

                <!-- Action Row: Share Button + WhatsApp Button -->
                <div style="display: flex; gap: 10px; align-items: center; margin-top: 14px; z-index: 2; position: relative;">
                  <button id="mnShareBtn" class="gw-btn-press" style="width: 46px; height: 46px; border-radius: 12px; border: 1px solid #E6DDD3; background: #FFFFFF; display: flex; align-items: center; justify-content: center; color: #1E1B18; font-size: 16px; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.04);" title="Share Link">
                    <i class="fa-solid fa-share-nodes"></i>
                  </button>

                  <button id="mnWhatsappBtn" class="gw-btn-press" style="flex: 1; height: 46px; border-radius: 12px; border: none; background: #16A34A; color: #FFFFFF; font-size: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; box-shadow: 0 4px 14px rgba(22, 163, 74, 0.28);">
                    <i class="fa-brands fa-whatsapp" style="font-size: 20px;"></i> Refer a friend
                  </button>
                </div>

                <!-- Referral Code Row with Copy Icon -->
                <div style="text-align: center; font-size: 12px; color: #52525B; margin-top: 10px; display: flex; align-items: center; justify-content: center; gap: 6px;">
                  <span>Referral Code:</span>
                  <strong style="color: #111827; letter-spacing: 0.5px; font-size: 13px;">${c.referralCode || 'R8HKBD'}</strong>
                  <button id="mnCopyBtn" style="background: none; border: none; color: #52525B; cursor: pointer; padding: 2px 4px; font-size: 13px;" title="Copy Code">
                    <i class="fa-regular fa-copy"></i>
                  </button>
                  <span id="mnCopyToast" style="display: none; font-size: 10.5px; color: #16A34A; font-weight: 700;">Copied!</span>
                </div>
              </div>

              <!-- 2. "MANTRA JAAP" Card -->
              <div style="background: #F7EFE7; border: 1px solid #EFE4D6; border-radius: 20px; padding: 16px 14px; position: relative;">
                
                <!-- Ornamental Section Divider -->
                <div style="display: flex; align-items: center; justify-content: center; gap: 10px; color: #78350F; font-size: 12px; font-weight: 800; letter-spacing: 1.2px;">
                  <span style="height: 1px; width: 36px; background: #D1C5B6;"></span>
                  ✦ MANTRA JAAP ✦
                  <span style="height: 1px; width: 36px; background: #D1C5B6;"></span>
                </div>

                <div style="text-align: center; font-size: 11px; color: #78716C; margin: 6px auto 10px; max-width: 270px; line-height: 1.45;">
                  Chant mantras and find peace, earn rewards as you stay consistent.
                </div>

                <!-- Claimed Indicator -->
                <div style="display: flex; align-items: center; justify-content: center; gap: 4px; font-size: 11px; color: #78716C; margin-bottom: 12px;">
                  <span style="display:inline-flex; width: 14px; height: 14px; border-radius: 50%; background: #F59E0B; color: #FFF; font-size: 8px; font-weight: 900; align-items: center; justify-content: center;">★</span> Claimed:
                </div>

                <!-- Mars Mantra Inner Sub-Card -->
                <div style="background: #FFFFFF; border-radius: 16px; padding: 12px 12px; border: 1px solid #ECE3D7; display: flex; align-items: center; justify-content: space-between; gap: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                  
                  <!-- Left: Mars 3D Textured Sphere -->
                  <div style="width: 44px; height: 44px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #F97316 0%, #C2410C 55%, #7C2D12 100%); box-shadow: 0 4px 10px rgba(194, 65, 12, 0.35); flex-shrink: 0; position: relative; overflow: hidden;">
                    <!-- Texture craters -->
                    <div style="position: absolute; top: 9px; left: 11px; width: 10px; height: 6px; border-radius: 50%; background: rgba(67, 20, 7, 0.45); filter: blur(0.5px);"></div>
                    <div style="position: absolute; bottom: 10px; right: 12px; width: 14px; height: 8px; border-radius: 50%; background: rgba(67, 20, 7, 0.5); filter: blur(0.5px);"></div>
                    <div style="position: absolute; top: 22px; left: 24px; width: 8px; height: 5px; border-radius: 50%; background: rgba(67, 20, 7, 0.35);"></div>
                  </div>

                  <!-- Center: Mantra Details -->
                  <div style="flex: 1;">
                    <div style="font-size: 14px; font-weight: 800; color: #1C1917;">${c.mantraName || 'Mars Mantra'}</div>
                    <div style="font-size: 11px; color: #948B83; margin-top: 2px;">${c.mantraChant || 'Om Am Angarakaya Namah'}</div>
                  </div>

                  <!-- Right: Claim ₹1 Button -->
                  <button id="mnMantraClaimBtn" class="gw-btn-press" style="background: ${mantraClaimed ? '#DCFCE7' : '#FEF3C7'}; border: 1px solid ${mantraClaimed ? '#86EFAC' : '#FDE68A'}; border-radius: 18px; padding: 6px 12px; font-size: 11.5px; font-weight: 800; color: ${mantraClaimed ? '#15803D' : '#92400E'}; display: flex; align-items: center; gap: 4px; cursor: pointer; white-space: nowrap;">
                    <span>${mantraClaimed ? 'Claimed' : 'Claim'}</span>
                    <span style="display:inline-flex; width: 14px; height: 14px; border-radius: 50%; background: ${mantraClaimed ? '#16A34A' : '#F59E0B'}; color: #FFF; font-size: 8px; font-weight: 900; align-items: center; justify-content: center;">${mantraClaimed ? '✓' : '★'}</span>
                    ${mantraClaimed ? '' : `<span>${cur}${c.mantraReward || 1} &rsaquo;</span>`}
                  </button>
                </div>
              </div>
            </div>

            <!-- Bottom Navigation Bar (5 tabs matching native app) -->
            <div style="background: #FAF6F0; border-top: 1px solid #E7DFD5; height: 62px; display: flex; align-items: center; justify-content: space-around; padding: 0 4px; flex-shrink: 0;">
              
              <!-- Tab 1: My Life (Lotus) -->
              <div style="display: flex; flex-direction: column; align-items: center; gap: 3px; cursor: pointer; opacity: 0.7;">
                <i class="fa-solid fa-spa" style="font-size: 18px; color: #78716C;"></i>
                <span style="font-size: 10px; color: #78716C; font-weight: 600;">My Life</span>
              </div>

              <!-- Tab 2: Chat -->
              <div style="display: flex; flex-direction: column; align-items: center; gap: 3px; cursor: pointer; opacity: 0.7;">
                <i class="fa-regular fa-comment-dots" style="font-size: 18px; color: #78716C;"></i>
                <span style="font-size: 10px; color: #78716C; font-weight: 600;">Chat</span>
              </div>

              <!-- Tab 3: Home -->
              <div style="display: flex; flex-direction: column; align-items: center; gap: 3px; cursor: pointer; opacity: 0.7;">
                <i class="fa-regular fa-circle-dot" style="font-size: 18px; color: #78716C;"></i>
                <span style="font-size: 10px; color: #78716C; font-weight: 600;">Home</span>
              </div>

              <!-- Tab 4: Reports (with NEW badge) -->
              <div style="display: flex; flex-direction: column; align-items: center; gap: 3px; cursor: pointer; opacity: 0.7; position: relative;">
                <span style="position: absolute; top: -5px; right: 2px; background: #2563EB; color: #FFFFFF; font-size: 7.5px; font-weight: 900; padding: 1px 4px; border-radius: 6px;">NEW</span>
                <i class="fa-regular fa-newspaper" style="font-size: 18px; color: #78716C;"></i>
                <span style="font-size: 10px; color: #78716C; font-weight: 600;">Reports</span>
              </div>

              <!-- Tab 5: Rewards (ACTIVE TAB - Terracotta Raised Disc) -->
              <div style="display: flex; flex-direction: column; align-items: center; gap: 2px; cursor: pointer;">
                <div style="width: 36px; height: 36px; border-radius: 50%; background: #7C2D12; display: flex; align-items: center; justify-content: center; color: #FFFFFF; box-shadow: 0 4px 10px rgba(124, 45, 18, 0.35);">
                  <i class="fa-solid fa-gift" style="font-size: 16px;"></i>
                </div>
                <span style="font-size: 10.5px; color: #7C2D12; font-weight: 800;">Rewards</span>
              </div>
            </div>

          </div>
        `;

        // Interactive Event Listeners
        const triggerCelebration = () => {
          if (c.soundEnabled !== false) snd.playCoinCascade(6);
          viewState = 'celebrate';
          renderView();
          fireConfetti(['#FBBF24', '#22C55E', '#FFFFFF']);
          ctx.emit('mynaksh_streak_claimed', { widgetId: widget.id, day: activeDay, amount: rewards[activeDay - 1] });
        };

        const day1 = mount.querySelector('#mnDayCard1');
        if (day1) day1.onclick = triggerCelebration;

        const day2 = mount.querySelector('#mnDayCard2');
        if (day2) day2.onclick = triggerCelebration;

        const getMoreBtn = mount.querySelector('#mnGetMoreBtn');
        if (getMoreBtn) getMoreBtn.onclick = triggerCelebration;

        const trigCel = mount.querySelector('#mnTriggerCelebration');
        if (trigCel) trigCel.onclick = triggerCelebration;

        const trigModal = mount.querySelector('#mnTriggerModal');
        if (trigModal) trigModal.onclick = () => { viewState = 'modal'; renderView(); };

        // Mantra Claim
        const mantraBtn = mount.querySelector('#mnMantraClaimBtn');
        if (mantraBtn) {
          mantraBtn.onclick = () => {
            if (mantraClaimed) return;
            mantraClaimed = true;
            walletBalance += Number(c.mantraReward || 1);
            if (c.soundEnabled !== false) snd.playRewardChime();
            renderView();
            fireConfetti(['#FBBF24', '#EA580C', '#FFFFFF']);
            ctx.emit('mynaksh_mantra_claimed', { widgetId: widget.id, reward: c.mantraReward || 1, newWallet: walletBalance });
          };
        }

        // Copy Referral Code
        const copyBtn = mount.querySelector('#mnCopyBtn');
        const copyToast = mount.querySelector('#mnCopyToast');
        if (copyBtn) {
          copyBtn.onclick = () => {
            const code = c.referralCode || 'R8HKBD';
            navigator.clipboard?.writeText(code).catch(() => {});
            if (c.soundEnabled !== false) snd.playToastPop();
            if (copyToast) {
              copyToast.style.display = 'inline';
              setTimeout(() => { copyToast.style.display = 'none'; }, 2000);
            }
          };
        }

        // WhatsApp Share
        const waBtn = mount.querySelector('#mnWhatsappBtn');
        if (waBtn) {
          waBtn.onclick = () => {
            if (c.soundEnabled !== false) snd.playToastPop();
            window.open(`https://wa.me/?text=Use%20my%20referral%20code%20${c.referralCode || 'R8HKBD'}%20on%20MyNaksh%20to%20get%20₹50!`, '_blank');
          };
        }

        // Wallet Add Funds
        const walletBadge = mount.querySelector('#mnWalletBadge');
        if (walletBadge) {
          walletBadge.onclick = () => {
            walletBalance += 10;
            if (c.soundEnabled !== false) snd.playRewardChime();
            renderView();
          };
        }
      }
    }

    renderView();
  }

  // =========================================================================
  // 3. INSTAASTRO POINTS & STREAK STEPPER (ScreenRecording_11-05-2026 11-20-58_1.mp4)
  // =========================================================================
  function renderInstaAstroPoints(mount, widget, ctx) {
    const c = widget.config;
    const snd = ctx.sound;
    let points = Number(c.startingPoints ?? 150);
    let showStepperModal = c.initialView === 'stepper';

    function renderView() {
      const milestones = [
        { pts: 500, label: 'Flat ₹50 Extra' },
        { pts: 1000, label: 'Flat ₹100 Extra' },
        { pts: 3000, label: 'Flat ₹300 Extra' },
        { pts: 5000, label: 'Flat ₹500 Extra' }
      ];
      const nextTarget = milestones.find(m => m.pts > points) || milestones[0];
      const pct = Math.min(100, Math.round((points / 1000) * 100));

      mount.innerHTML = `
        <div class="gw-phone-frame" style="background: #FFFFFF; color: #18181B;">
          <!-- Floating Top Dark Toast -->
          <div id="instaToast" style="display: none; position: absolute; top: 14px; left: 16px; right: 16px; z-index: 80; background: #18181B; color: #FFF; border-radius: 14px; padding: 12px 14px; align-items: center; justify-content: space-between; box-shadow: 0 12px 30px rgba(0,0,0,0.35);">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 20px; color: ${c.accentColor || '#FFC700'};">★</span>
              <div>
                <div style="font-size: 13px; font-weight: 800;">Congratulations!</div>
                <div style="font-size: 11px; color: #A1A1AA;">You have earned points</div>
              </div>
            </div>
            <div style="font-size: 18px; font-weight: 900; color: #FFF;" id="instaToastAmt">+50</div>
          </div>

          <!-- Top Golden Gradient Banner -->
          <div style="background: linear-gradient(180deg, #FFF3CC, #FFE399); padding: 18px 16px 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
              <span style="font-size: 16px; font-weight: 800;">← Insta Points</span>
              <button id="instaOpenStepper" style="background: #FFFFFF; border: none; padding: 5px 10px; border-radius: 12px; font-size: 10px; font-weight: 800; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">7-Day Streak</button>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 32px; color: #F59E0B; filter: drop-shadow(0 2px 4px rgba(245,158,11,0.3));">★</span>
                <div>
                  <div style="font-size: 26px; font-weight: 900; line-height: 1;" id="instaPtsVal">${points}</div>
                  <div style="font-size: 10px; font-weight: 800; color: #78350F; letter-spacing: 0.6px;">POINTS</div>
                </div>
              </div>
              <div style="font-size: 11px; color: #573B00; text-align: right; max-width: 165px; font-weight: 600;">
                Earn <b>${Math.max(0, nextTarget.pts - points)} Points</b> more &amp; Win <b>${nextTarget.label}</b> Coupon
              </div>
            </div>

            <!-- Milestone Track -->
            <div style="position: relative; padding-top: 8px;">
              <div style="height: 5px; background: rgba(255,255,255,0.75); border-radius: 4px; overflow: hidden;">
                <div style="height: 100%; width: ${pct}%; background: #F59E0B; transition: width 0.4s ease;"></div>
              </div>
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-top: 8px;">
                ${milestones.map(m => `
                  <div style="text-align: center;">
                    <div style="font-size: 11px; font-weight: 800; color: #18181B;">${m.pts} <span style="color:#F59E0B;">★</span></div>
                    <div style="background: rgba(255,255,255,0.7); font-size: 9px; font-weight: 700; padding: 3px 4px; border-radius: 6px; margin-top: 3px;">${m.label}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- How to Earn Section -->
          <div style="padding: 16px; flex: 1; display: flex; flex-direction: column; gap: 10px; background: #FFF;">
            <div style="font-size: 14px; font-weight: 800;">How to Earn?</div>

            ${[
              { pts: 50, text: 'Earn points by knowing your Horoscope of the day!', icon: '🔮' },
              { pts: 30, text: 'Earn points by checking your Daily Tarot Reading!', icon: '🃏' },
              { pts: 10, text: 'Earn points by reading your Panchang of the day!', icon: '📅' }
            ].map((task, idx) => `
              <div style="background: #FFFDF7; border: 1px solid #FDE68A; border-radius: 14px; padding: 12px; display: flex; align-items: center; gap: 10px;">
                <div style="text-align: center; min-width: 34px;">
                  <div style="font-size: 16px; color: #F59E0B;">★</div>
                  <div style="font-size: 12px; font-weight: 900;">${task.pts}</div>
                </div>
                <div style="flex: 1; font-size: 11px; font-weight: 600; color: #374151; line-height: 1.35;">${task.text}</div>
                <button class="instaEarnBtn gw-btn-press" data-pts="${task.pts}" style="background: ${c.accentColor || '#FFC700'}; border: none; border-radius: 16px; padding: 7px 12px; font-size: 11px; font-weight: 800; color: #18181B; cursor: pointer; white-space: nowrap;">
                  Earn Now
                </button>
              </div>
            `).join('')}
          </div>

          <!-- 7-Day Streak Linear Stepper Bottom Sheet -->
          ${showStepperModal ? `
            <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.55); z-index: 70; display: flex; align-items: flex-end;">
              <div style="background: #FFFFFF; width: 100%; border-radius: 24px 24px 0 0; padding: 18px 18px 22px; animation: gwPopIn 0.25s ease;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <span style="font-size: 20px; font-weight: 900; color: #18181B;"><span style="color:#F59E0B;">★</span> +${c.streakBonusPoints || 70}</span>
                  <button id="instaCloseStepper" style="background: none; border: none; font-size: 20px; color: #6B7280; cursor: pointer;">&times;</button>
                </div>
                <div style="font-size: 16px; font-weight: 800; color: #18181B;">You have earned Insta Points</div>
                <div style="font-size: 11px; color: #6B7280; margin-bottom: 16px;">Check your Horoscope regularly to earn bonus points</div>

                <!-- 7-Step Linear Progress -->
                <div style="display: flex; justify-content: space-between; align-items: center; position: relative; margin-bottom: 8px;">
                  <div style="position: absolute; top: 50%; left: 10px; right: 10px; height: 3px; background: #E5E7EB; transform: translateY(-50%); z-index: 0;">
                    <div style="height: 100%; width: 32%; background: ${c.progressColor || '#22C55E'};"></div>
                  </div>
                  ${[1, 2, 3, 4, 5, 6, 7].map(d => {
                    const done = d <= 2;
                    return `<div style="position: relative; z-index: 1; width: 28px; height: 28px; border-radius: 6px; background: ${done ? (c.progressColor || '#22C55E') : '#F3F4F6'}; border: 1px solid ${done ? '#16A34A' : '#D1D5DB'}; color: ${done ? '#FFF' : '#374151'}; font-size: 11px; font-weight: 800; display: flex; align-items: center; justify-content: center;">${done ? '✓' : d}</div>`;
                  }).join('')}
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 9px; color: #6B7280; font-weight: 700; margin-bottom: 18px; padding: 0 2px;">
                  <span></span><span></span><span>+20 Bonus</span><span></span><span>+50 Bonus</span><span></span><span>+100 Bonus</span>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <label style="font-size: 11px; color: #6B7280; display: flex; align-items: center; gap: 6px; cursor: pointer;">
                    <input type="checkbox"> Don't show me again!
                  </label>
                  <button id="instaCheckPtsBtn" class="gw-btn-press" style="background: ${c.accentColor || '#FFC700'}; border: none; border-radius: 10px; padding: 10px 16px; font-size: 12px; font-weight: 800; color: #18181B; cursor: pointer;">
                    Check Points
                  </button>
                </div>
              </div>
            </div>
          ` : ''}
        </div>
      `;

      mount.querySelectorAll('.instaEarnBtn').forEach(btn => {
        btn.onclick = () => {
          const add = Number(btn.getAttribute('data-pts'));
          points += add;
          if (c.soundEnabled !== false) snd.playToastPop();
          mount.querySelector('#instaPtsVal').innerText = points;
          const toast = mount.querySelector('#instaToast');
          mount.querySelector('#instaToastAmt').innerText = '+' + add;
          toast.style.display = 'flex';
          toast.style.animation = 'none';
          toast.offsetHeight;
          toast.style.animation = 'gwToastSlide 2.6s ease forwards';
          ctx.emit('instaastro_points_earned', { widgetId: widget.id, amount: add });
        };
      });

      const openStep = mount.querySelector('#instaOpenStepper');
      if (openStep) openStep.onclick = () => {
        if (c.soundEnabled !== false) snd.playToastPop();
        showStepperModal = true;
        renderView();
      };
      const closeStep = mount.querySelector('#instaCloseStepper');
      if (closeStep) closeStep.onclick = () => { showStepperModal = false; renderView(); };
      const checkBtn = mount.querySelector('#instaCheckPtsBtn');
      if (checkBtn) checkBtn.onclick = () => {
        if (c.soundEnabled !== false) snd.playRewardChime();
        showStepperModal = false;
        renderView();
      };
    }
    renderView();
  }

  // =========================================================================
  // 4. PAYTM CHEST FLIP & ODOMETER (ScreenRecording_11-10-2026 22-17-38_1.mp4 pt1)
  // =========================================================================
  function renderPaytmChestScratch(mount, widget, ctx) {
    const c = widget.config;
    const snd = ctx.sound;
    let coins = Number(c.startingCoins ?? 135);
    let stage = 'card'; // 'card' | 'chest_closed' | 'chest_open'

    function renderView() {
      const digits = String(coins).padStart(3, '0').split('');
      const isMaroon = (c.cardTheme || 'maroon') === 'maroon';
      const cardBg = isMaroon
        ? 'linear-gradient(160deg, #3A0A1E, #1F0610)'
        : 'linear-gradient(160deg, #094D7A, #04253D)';

      mount.innerHTML = `
        <div class="gw-phone-frame" style="background: #0D1B2A; color: #FFFFFF; padding: 18px 16px;">
          <button class="gw-replay-chip" id="ptmChestReset"><i class="fa-solid fa-rotate-right"></i> Reset</button>

          <!-- Top Navy Summary Bar -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; background: #071220; border: 1px solid #1C314B; border-radius: 14px; padding: 10px 8px; text-align: center; margin-bottom: 20px;">
            <div>
              <div style="font-size: 13px; font-weight: 900; color: #38BDF8;">₹1,068</div>
              <div style="font-size: 9px; color: #94A3B8;">Cashback Won</div>
            </div>
            <div style="background: #10253F; border-radius: 10px; padding: 2px 4px; border: 1px solid #254B75;">
              <div style="font-size: 14px; font-weight: 900; color: #FACC15;" id="ptmHeaderCoins">${coins}</div>
              <div style="font-size: 9px; color: #E2E8F0;">Gold Coins</div>
            </div>
            <div>
              <div style="font-size: 13px; font-weight: 900; color: #FFF;">80</div>
              <div style="font-size: 9px; color: #94A3B8;">Saved Vouchers</div>
            </div>
          </div>

          <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative;">
            ${stage === 'card' ? `
              <!-- Festive Illustrated Scratch Card -->
              <div id="ptmScratchCard" class="gw-btn-press" style="width: 240px; height: 340px; border-radius: 22px; background: ${cardBg}; border: 2px solid #D4A153; box-shadow: 0 20px 50px rgba(0,0,0,0.6); display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding: 18px; cursor: pointer; position: relative; overflow: hidden;">
                <div style="width: 100%; display: flex; justify-content: space-between; font-size: 24px;">
                  <span>${isMaroon ? '🐘' : '🪷'}</span>
                  <span>${isMaroon ? '🐘' : '🪷'}</span>
                </div>
                <div style="background: #230A13; border: 2px solid #D4A153; border-radius: 18px; padding: 20px 24px; text-align: center; box-shadow: 0 6px 20px rgba(0,0,0,0.4);">
                  <div style="font-size: 22px; font-weight: 900; color: #FDE68A; letter-spacing: 1px; line-height: 1.15;">SCRATCH<br>CARD</div>
                </div>
                <div style="font-size: 11px; color: #FDE68A; font-weight: 700; opacity: 0.85;">Tap to Scratch &amp; Open Chest</div>
              </div>
            ` : `
              <!-- Treasure Chest + Flying Coins + Mechanical Odometer -->
              <div id="ptmCoinFountain" style="position: absolute; top: 45%; left: 50%; pointer-events: none; z-index: 20;"></div>

              ${stage === 'chest_open' ? `
                <div style="text-align: center; margin-bottom: 10px; animation: gwPopIn 0.35s ease;">
                  <div style="font-size: 14px; font-weight: 900; color: #E2E8F0; letter-spacing: 0.8px;">YOU WON</div>
                  <div style="font-size: 38px; font-weight: 900; color: #FACC15; line-height: 1.1;">${c.rewardCoins || 31}</div>
                  <div style="font-size: 13px; font-weight: 700; color: #FDE68A;">Gold Coins</div>
                </div>
              ` : `
                <div style="font-size: 13px; color: #93C5FD; font-weight: 700; margin-bottom: 16px;">Tap Chest to Unlock Coins</div>
              `}

              <div id="ptmChestIcon" style="font-size: 96px; cursor: pointer; filter: drop-shadow(0 12px 24px rgba(250, 204, 21, 0.35)); transition: transform 0.2s ease;">
                ${stage === 'chest_open' ? '👑' : '🧰'}
              </div>

              <!-- Mechanical Yellow Odometer Counter -->
              <div style="margin-top: 24px; text-align: center;">
                <div style="font-size: 11px; color: #CBD5E1; font-weight: 600; margin-bottom: 8px;">Available Gold Coins</div>
                <div style="display: flex; gap: 6px; justify-content: center;">
                  ${digits.map(d => `
                    <div style="width: 34px; height: 44px; background: linear-gradient(180deg, #FEF08A, #FACC15); color: #0F172A; border-radius: 8px; font-size: 22px; font-weight: 900; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 -3px 0 #CA8A04, 0 4px 10px rgba(0,0,0,0.4);">
                      ${d}
                    </div>
                  `).join('')}
                </div>
              </div>
            `}
          </div>
        </div>
      `;

      const card = mount.querySelector('#ptmScratchCard');
      if (card) {
        card.onclick = () => {
          if (c.soundEnabled !== false) snd.playCardFlip();
          stage = 'chest_closed';
          renderView();
        };
      }

      const chestEl = mount.querySelector('#ptmChestIcon');
      if (chestEl && stage === 'chest_closed') {
        chestEl.onclick = () => {
          stage = 'chest_open';
          const target = coins + Number(c.rewardCoins || 31);
          renderView();
          if (c.soundEnabled !== false) snd.playCoinCascade(10);
          fireConfetti(['#FACC15', '#00B9F5', '#FFFFFF']);

          // Spawn flying coins arc
          const fountain = mount.querySelector('#ptmCoinFountain');
          for (let i = 0; i < 10; i++) {
            const coin = document.createElement('div');
            coin.textContent = '🪙';
            coin.style.cssText = `position:absolute; font-size:20px; --tx-mid:${(Math.random()-0.5)*140}px; --tx-end:${(Math.random()-0.5)*60}px; animation: gwCoinFly 0.85s ease-out ${i * 0.05}s forwards;`;
            fountain.appendChild(coin);
          }

          // Animate odometer rolling smoothly
          const stepTimer = setInterval(() => {
            if (coins < target) {
              coins++;
              if (c.soundEnabled !== false) snd.playOdometerTick();
              const hdr = mount.querySelector('#ptmHeaderCoins');
              if (hdr) hdr.innerText = coins;
            } else {
              clearInterval(stepTimer);
              renderView();
            }
          }, 28);
          ctx.emit('paytm_chest_opened', { widgetId: widget.id, rewardCoins: c.rewardCoins || 31 });
        };
      }

      mount.querySelector('#ptmChestReset').onclick = () => {
        coins = Number(c.startingCoins ?? 135);
        stage = 'card';
        renderView();
      };
    }
    renderView();
  }

  // =========================================================================
  // 5. PAYTM SPIN & WIN + YELLOW STARBURST (ScreenRecording_11-10-2026 22-17-38_1.mp4 pt2)
  // =========================================================================
  function renderPaytmSpinWin(mount, widget, ctx) {
    const c = widget.config;
    const snd = ctx.sound;
    let spinsLeft = Number(c.spinsLeft ?? 3);
    let currentAngle = 0;
    let isSpinning = false;
    let wonPrize = null;

    const slices = Array.isArray(c.slices) ? c.slices : [
      { label: 'Flat ₹5 Cashback', color: '#0F3D99', icon: '🎁' },
      { label: '₹100 Off Deal', color: '#00B9F5', icon: '🎧' },
      { label: '4 at Rs. 549', color: '#062463', icon: '👟' },
      { label: '30 Days Free Pro', color: '#1E88E5', icon: '🎵' }
    ];

    function renderView() {
      mount.innerHTML = `
        <div class="gw-phone-frame" style="background: radial-gradient(circle at 50% 45%, #123075, #061032 85%); color: #FFF; padding: 16px;">
          <!-- Starburst Fullscreen Celebration Layer -->
          <div id="ptmStarburstOverlay" style="display: none; position: absolute; inset: 0; z-index: 50; overflow: hidden;">
            <div id="ptmStarShape" style="position: absolute; top: 50%; left: 50%; width: 280px; height: 280px; background: ${c.starburstColor || '#FFC800'}; clip-path: polygon(50% 0%, 64% 36%, 100% 50%, 64% 64%, 50% 100%, 36% 64%, 0% 50%, 36% 36%); pointer-events: none;"></div>
          </div>

          ${wonPrize ? `
            <!-- Win Result Screen -->
            <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: space-between; text-align: center; padding: 14px 4px; position: relative; z-index: 10;">
              <div>
                <div style="font-size: 24px; font-weight: 900; color: #FFC800; letter-spacing: -0.5px;">congratulations!</div>
                <div style="font-size: 12px; color: #E2E8F0; margin-top: 6px; max-width: 240px;">You Won <b>${wonPrize.label}</b></div>
              </div>

              <div style="background: #FFFFFF; color: #111827; width: 256px; border-radius: 18px; padding: 18px 14px; box-shadow: 0 20px 45px rgba(0,0,0,0.45); animation: gwPopIn 0.35s ease;">
                <div style="font-size: 40px; margin-bottom: 8px;">${wonPrize.icon}</div>
                <div style="font-size: 16px; font-weight: 900; margin-bottom: 4px;">${wonPrize.label}</div>
                <div style="font-size: 11px; color: #64748B; margin-bottom: 14px;">Instant Voucher Unlocked</div>
                <button class="gw-btn-press" style="width: 100%; height: 38px; border-radius: 10px; border: none; background: #0F172A; color: #FFF; font-size: 12px; font-weight: 800; cursor: pointer;">Redeem Now</button>
              </div>

              <div style="width: 100%;">
                <div style="font-size: 11px; color: #93C5FD; margin-bottom: 8px;">You have ${spinsLeft} spins left</div>
                <button id="ptmSpinAgain" class="gw-btn-press" style="width: 100%; height: 44px; border-radius: 12px; border: none; background: #00B9F5; color: #FFFFFF; font-size: 14px; font-weight: 900; cursor: pointer;">Spin Again</button>
              </div>
            </div>
          ` : `
            <!-- Header & Category Pills -->
            <div>
              <div style="font-size: 16px; font-weight: 800; margin-bottom: 12px;">← Spin and Win</div>
              <div style="display: flex; gap: 6px; overflow: hidden; margin-bottom: 16px;">
                <span style="background: #FFF; color: #0A1647; font-size: 10px; font-weight: 800; padding: 5px 10px; border-radius: 14px;">Top Deals</span>
                <span style="background: rgba(255,255,255,0.14); color: #FFF; font-size: 10px; font-weight: 700; padding: 5px 10px; border-radius: 14px;">Steal deals</span>
                <span style="background: rgba(255,255,255,0.14); color: #FFF; font-size: 10px; font-weight: 700; padding: 5px 10px; border-radius: 14px;">Electronics</span>
              </div>
            </div>

            <!-- Wheel + Golden Dotted Rim -->
            <div style="position: relative; width: 236px; height: 236px; margin: 4px auto;">
              <div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 22px solid #00E5FF; filter: drop-shadow(0 2px 6px rgba(0,229,255,0.7)); z-index: 15;"></div>
              <canvas id="ptmWheelCanvas" width="236" height="236" style="border-radius: 50%; box-shadow: 0 0 0 6px #D4AF37, 0 12px 32px rgba(0,0,0,0.65);"></canvas>
            </div>

            <!-- 3D Circular SPIN Button -->
            <div style="text-align: center; margin-top: 18px;">
              <button id="ptmSpinBtn" class="gw-btn-press" style="width: 148px; height: 52px; border-radius: 26px; border: none; background: linear-gradient(180deg, #FFE033, #F59E0B); border-bottom: 4px solid #B45309; color: #061032; font-size: 16px; font-weight: 900; letter-spacing: 0.6px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 8px 24px rgba(245, 158, 11, 0.45);">
                SPIN <span style="background: #0A1647; color: #FACC15; font-size: 11px; padding: 2px 8px; border-radius: 10px;">🪙 ${spinsLeft}</span>
              </button>
            </div>
          `}
        </div>
      `;

      const canvas = mount.querySelector('#ptmWheelCanvas');
      if (canvas) {
        const wctx = canvas.getContext('2d');
        const draw = () => {
          const n = slices.length;
          const arc = (Math.PI * 2) / n;
          wctx.clearRect(0, 0, 236, 236);
          slices.forEach((s, i) => {
            const a = currentAngle + i * arc;
            wctx.beginPath();
            wctx.moveTo(118, 118);
            wctx.arc(118, 118, 114, a, a + arc);
            wctx.closePath();
            wctx.fillStyle = s.color;
            wctx.fill();
            wctx.strokeStyle = 'rgba(255,255,255,0.25)';
            wctx.lineWidth = 1.5;
            wctx.stroke();

            wctx.save();
            wctx.translate(118, 118);
            wctx.rotate(a + arc / 2);
            wctx.fillStyle = '#FFFFFF';
            wctx.font = 'bold 10px sans-serif';
            wctx.textAlign = 'right';
            wctx.fillText(s.label.slice(0, 14), 102, 4);
            wctx.font = '16px sans-serif';
            wctx.fillText(s.icon || '🎁', 60, -10);
            wctx.restore();
          });
          // Center gold knob
          wctx.beginPath();
          wctx.arc(118, 118, 18, 0, Math.PI * 2);
          wctx.fillStyle = '#FACC15';
          wctx.fill();
          wctx.strokeStyle = '#FFF';
          wctx.lineWidth = 3;
          wctx.stroke();
        };
        draw();

        mount.querySelector('#ptmSpinBtn').onclick = () => {
          if (isSpinning) return;
          isSpinning = true;
          spinsLeft = Math.max(0, spinsLeft - 1);
          const winIdx = Math.floor(Math.random() * slices.length);
          const startAng = currentAngle;
          const totalRot = Math.PI * 2 * (5 + Math.random() * 2);
          const start = performance.now();
          let lastTick = 0;

          function step(now) {
            const p = Math.min((now - start) / 3400, 1);
            const ease = 1 - Math.pow(1 - p, 4);
            currentAngle = startAng + totalRot * ease;
            draw();

            const tickStep = Math.floor(currentAngle * 2.5);
            if (tickStep !== lastTick) {
              lastTick = tickStep;
              if (c.soundEnabled !== false) snd.playWheelTick(1.2 - p * 0.35);
            }

            if (p < 1) {
              requestAnimationFrame(step);
            } else {
              isSpinning = false;
              const overlay = mount.querySelector('#ptmStarburstOverlay');
              const star = mount.querySelector('#ptmStarShape');
              overlay.style.display = 'block';
              star.style.animation = 'gwStarburstExpand 0.85s ease forwards';
              if (c.soundEnabled !== false) snd.playStarburstWin();
              fireConfetti(['#FFC800', '#00B9F5', '#FFFFFF']);
              setTimeout(() => {
                wonPrize = slices[winIdx];
                renderView();
                ctx.emit('paytm_spin_won', { widgetId: widget.id, prize: wonPrize.label });
              }, 480);
            }
          }
          requestAnimationFrame(step);
        };
      }

      const again = mount.querySelector('#ptmSpinAgain');
      if (again) {
        again.onclick = () => {
          if (spinsLeft === 0) spinsLeft = 3;
          wonPrize = null;
          renderView();
        };
      }
    }
    renderView();
  }

  // =========================================================================
  // 6. DUOLINGO FULL FLOW (ScreenRecording_11-05-2026 11-25-21_1.mp4)
  // =========================================================================
  function renderDuolingoFlow(mount, widget, ctx) {
    const c = widget.config;
    const snd = ctx.sound;
    let step = Number(c.startStep || 1); // 1: Lesson Complete, 2: Ignite Streak, 3: Streak Goal, 4: Rare Chest -> x3 XP
    let streakIgnited = false;
    let selectedGoal = 7;
    let chestPhase = 'quest'; // 'quest' | 'rare_chest' | 'potion_x3'
    let gems = 593;

    function renderView() {
      const topNav = `
        <div style="display: flex; justify-content: center; gap: 4px; padding: 8px 10px; background: rgba(0,0,0,0.25); z-index: 20;">
          ${[1, 2, 3, 4].map(n => `
            <button class="duoStageBtn" data-s="${n}" style="flex:1; padding:4px 0; border-radius:8px; border:none; font-size:10px; font-weight:800; cursor:pointer; background:${step===n?'#1CB0F6':'rgba(255,255,255,0.12)'}; color:#FFF;">S${n}</button>
          `).join('')}
        </div>
      `;

      if (step === 1) {
        mount.innerHTML = `
          <div class="gw-phone-frame" style="background: #FFFFFF; color: #3C3C3C;">
            ${topNav}
            <!-- Green Striped Banner Header -->
            <div style="background: linear-gradient(135deg, ${c.themeColor || '#58CC02'}, #2EC4B6); padding: 26px 16px 20px; text-align: center;">
              <div style="font-size: 64px; animation: gwPopIn 0.45s ease;">🦉✨</div>
              <div style="font-size: 24px; font-weight: 900; color: #FFF; text-shadow: 0 2px 0 rgba(0,0,0,0.15);">Lesson complete!</div>
            </div>

            <div style="flex: 1; padding: 20px 18px; display: flex; flex-direction: column; justify-content: space-between; text-align: center;">
              <div>
                <div style="font-size: 16px; font-weight: 800; color: #4B4B4B;">Who needs an owl?</div>
                <div style="font-size: 12px; color: #777777; margin-top: 2px;">When you've got an Oscar.</div>

                <!-- 3 Sequential Stat Cards -->
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 22px;">
                  <div style="border: 2px solid #FFC800; border-radius: 14px; overflow: hidden; animation: gwPopIn 0.3s ease;">
                    <div style="background: #FFC800; color: #FFF; font-size: 9px; font-weight: 900; padding: 4px;">TOTAL XP</div>
                    <div style="padding: 12px 4px; font-size: 16px; font-weight: 900; color: #FF9600;">⚡ ${c.xpEarned || 12}</div>
                  </div>
                  <div style="border: 2px solid #58CC02; border-radius: 14px; overflow: hidden; animation: gwPopIn 0.55s ease;">
                    <div style="background: #58CC02; color: #FFF; font-size: 9px; font-weight: 900; padding: 4px;">GOOD</div>
                    <div style="padding: 12px 4px; font-size: 16px; font-weight: 900; color: #58CC02;">🎯 ${c.accuracy || 78}%</div>
                  </div>
                  <div style="border: 2px solid #1CB0F6; border-radius: 14px; overflow: hidden; animation: gwPopIn 0.8s ease;">
                    <div style="background: #1CB0F6; color: #FFF; font-size: 9px; font-weight: 900; padding: 4px;">BLAZING</div>
                    <div style="padding: 12px 4px; font-size: 16px; font-weight: 900; color: #1CB0F6;">⏱ ${c.durationText || '0:49'}</div>
                  </div>
                </div>
              </div>

              <button id="duoClaimXpBtn" class="gw-btn-press" style="width: 100%; height: 48px; border-radius: 16px; border: none; background: #1CB0F6; border-bottom: 4px solid #1899D6; color: #FFF; font-size: 14px; font-weight: 900; text-transform: uppercase; cursor: pointer;">
                Claim XP
              </button>
            </div>
          </div>
        `;
        if (c.soundEnabled !== false) {
          snd.playMp3('/assets/duolingo/duo_lesson_complete.mp3', 0.65);
          setTimeout(() => snd.playMp3('/assets/duolingo/se_stats_audio_1.mp3', 0.6), 300);
          setTimeout(() => snd.playMp3('/assets/duolingo/se_stats_audio_2.mp3', 0.6), 550);
          setTimeout(() => snd.playMp3('/assets/duolingo/se_stats_audio_3.mp3', 0.6), 800);
        }
        mount.querySelector('#duoClaimXpBtn').onclick = () => {
          streakIgnited = false;
          step = 2;
          renderView();
        };

      } else if (step === 2) {
        if (!streakIgnited) {
          mount.innerHTML = `
            <div class="gw-phone-frame" style="background: #1A262B; color: #FFF; justify-content: space-between; text-align: center;">
              ${topNav}
              <div id="duoIgniteZone" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; padding: 24px;">
                <div style="width: 140px; height: 140px; border-radius: 50%; background: radial-gradient(circle, rgba(255,150,0,0.45), transparent 70%); display: flex; align-items: center; justify-content: center; animation: gwFloatCoin 2s ease-in-out infinite;">
                  <span style="font-size: 72px; filter: drop-shadow(0 0 18px #FF9600);">🔥</span>
                </div>
                <div style="font-size: 18px; font-weight: 900; margin-top: 20px;">Tap or Swipe to ignite your streak!</div>
              </div>
              <div style="height: 20px;"></div>
            </div>
          `;
          mount.querySelector('#duoIgniteZone').onclick = () => {
            streakIgnited = true;
            if (c.soundEnabled !== false) snd.playMp3('/assets/duolingo/streak_milestone_flame.mp3', 0.75);
            fireConfetti(['#FF9600', '#FFC800', '#FFFFFF']);
            renderView();
          };
        } else {
          mount.innerHTML = `
            <div class="gw-phone-frame" style="background: #FFFFFF; color: #4B4B4B; text-align: center;">
              ${topNav}
              <div style="flex: 1; padding: 20px 18px; display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
                <div style="border: 2px solid #E5E5E5; border-radius: 16px; padding: 10px 14px; font-size: 13px; font-weight: 700;">
                  A streak is born! Practice every day to build a habit.
                </div>

                <div style="animation: gwPopIn 0.4s ease;">
                  <div id="duoLottieFlame" style="width: 120px; height: 120px; margin: 0 auto;"></div>
                  <div style="font-size: 46px; font-weight: 900; color: #FF9600; line-height: 1;">${c.streakCount || 1}</div>
                  <div style="font-size: 18px; font-weight: 900; color: #FF9600;">day streak</div>
                </div>

                <!-- 7-Day Circle Row -->
                <div style="display: flex; justify-content: space-between; width: 100%; padding: 0 6px;">
                  ${['Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We'].map((d, i) => `
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
                      <span style="font-size: 11px; font-weight: 800; color: ${i===0?'#FF9600':'#AFAFAF'};">${d}</span>
                      <div style="width: 26px; height: 26px; border-radius: 50%; background: ${i===0?'#FF9600':'#E5E5E5'}; color: #FFF; font-size: 12px; font-weight: 900; display: flex; align-items: center; justify-content: center;">${i===0?'✓':''}</div>
                    </div>
                  `).join('')}
                </div>

                <button id="duoSeeTomorrow" class="gw-btn-press" style="width: 100%; height: 48px; border-radius: 16px; border: none; background: #1CB0F6; border-bottom: 4px solid #1899D6; color: #FFF; font-size: 14px; font-weight: 900; cursor: pointer;">
                  SEE YOU TOMORROW
                </button>
              </div>
            </div>
          `;
          if (typeof window.lottie === 'object') {
            window.lottie.loadAnimation({
              container: mount.querySelector('#duoLottieFlame'),
              renderer: 'svg', loop: true, autoplay: true,
              path: '/assets/duolingo/friend_streak_coupled_flame.json'
            });
          }
          mount.querySelector('#duoSeeTomorrow').onclick = () => { step = 3; renderView(); };
        }

      } else if (step === 3) {
        mount.innerHTML = `
          <div class="gw-phone-frame" style="background: #FFFFFF; color: #4B4B4B;">
            ${topNav}
            <div style="flex: 1; padding: 18px; display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
              <div style="display: flex; justify-content: flex-end; width: 100%; color: #1CB0F6; font-weight: 900; font-size: 14px;">💎 ${gems}</div>
              <div style="border: 2px solid #E5E5E5; border-radius: 16px; padding: 10px 14px; font-size: 13px; font-weight: 700; text-align: center;">
                Let's commit to learning with a Streak Goal!
              </div>
              <div style="width: 100%; display: flex; flex-direction: column; gap: 8px;">
                ${[[7, 35], [14, 140], [30, 210], [50, 350]].map(([d, g]) => `
                  <div class="duoGoalOption" data-d="${d}" style="border: 2px solid ${selectedGoal===d?'#1CB0F6':'#E5E5E5'}; background: ${selectedGoal===d?'#EBF8FF':'#FFF'}; border-radius: 14px; padding: 12px 14px; display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                    <span style="font-weight: 800; font-size: 14px; color: ${selectedGoal===d?'#1899D6':'#4B4B4B'};">${d} days</span>
                    <span style="font-size: 12px; font-weight: 700; color: #777;">Earn ${g} gems</span>
                  </div>
                `).join('')}
              </div>
              <button id="duoCommitBtn" class="gw-btn-press" style="width: 100%; height: 48px; border-radius: 16px; border: none; background: #1CB0F6; border-bottom: 4px solid #1899D6; color: #FFF; font-size: 14px; font-weight: 900; cursor: pointer;">
                COMMIT TO MY GOAL
              </button>
            </div>
          </div>
        `;
        mount.querySelectorAll('.duoGoalOption').forEach(el => {
          el.onclick = () => { selectedGoal = Number(el.getAttribute('data-d')); renderView(); };
        });
        mount.querySelector('#duoCommitBtn').onclick = () => {
          gems += 20;
          if (c.soundEnabled !== false) snd.playMp3('/assets/duolingo/star_chime.mp3', 0.7);
          chestPhase = 'quest';
          step = 4;
          renderView();
        };

      } else {
        if (chestPhase === 'quest') {
          mount.innerHTML = `
            <div class="gw-phone-frame" style="background: #FFFFFF; color: #4B4B4B;">
              ${topNav}
              <div style="flex: 1; padding: 20px 18px; display: flex; flex-direction: column; justify-content: space-between;">
                <div style="font-size: 22px; font-weight: 900; color: #CC348D; text-align: center;">+1 Quest Point!</div>
                <div style="background: #FFF9E6; border: 2px solid #FFC800; border-radius: 16px; padding: 14px;">
                  <div style="font-weight: 800; font-size: 13px; margin-bottom: 8px;">Start a streak ✦</div>
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="flex: 1; height: 14px; background: #FFC800; border-radius: 7px;"></div>
                    <span style="font-size: 22px;">🧰</span>
                  </div>
                </div>
                <button id="duoOpenQuestChest" class="gw-btn-press" style="width: 100%; height: 48px; border-radius: 16px; border: none; background: #1CB0F6; border-bottom: 4px solid #1899D6; color: #FFF; font-size: 14px; font-weight: 900; cursor: pointer;">
                  OPEN CHEST
                </button>
              </div>
            </div>
          `;
          if (c.soundEnabled !== false) snd.playMp3('/assets/duolingo/daily_quest_quest_point_v1.mp3', 0.7);
          mount.querySelector('#duoOpenQuestChest').onclick = () => { chestPhase = 'rare_chest'; renderView(); };

        } else if (chestPhase === 'rare_chest') {
          mount.innerHTML = `
            <div class="gw-phone-frame" style="background: #26B6F7; color: #FFF; text-align: center;">
              ${topNav}
              <div id="duoTapRare" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; padding: 20px;">
                <div style="font-size: 20px; font-weight: 900; letter-spacing: 2px; margin-bottom: 12px;">RARE</div>
                <div id="duoRareLottie" style="width: 220px; height: 220px;"></div>
                <div style="font-size: 16px; font-weight: 800; margin-top: 8px;">Tap to open!</div>
              </div>
            </div>
          `;
          const anim = typeof window.lottie === 'object' ? window.lottie.loadAnimation({
            container: mount.querySelector('#duoRareLottie'),
            renderer: 'svg', loop: false, autoplay: false,
            path: `/assets/duolingo/chest_open_${c.lottieTier || 'gold'}.json`
          }) : null;
          mount.querySelector('#duoTapRare').onclick = () => {
            if (anim) anim.play();
            if (c.soundEnabled !== false) snd.playMp3('/assets/duolingo/daily_quest_chest_open_v1.mp3', 0.75);
            setTimeout(() => { chestPhase = 'potion_x3'; renderView(); }, 950);
          };

        } else {
          mount.innerHTML = `
            <div class="gw-phone-frame" style="background: #7D54E6; color: #FFF; text-align: center;">
              ${topNav}
              <div style="flex: 1; padding: 24px 18px; display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
                <div style="margin-top: 30px; animation: gwPopIn 0.4s ease;">
                  <div style="font-size: 86px; filter: drop-shadow(0 8px 20px rgba(0,0,0,0.25));">🧪</div>
                  <div style="font-size: 38px; font-weight: 900; margin-top: 8px;">x3</div>
                  <div style="font-size: 15px; font-weight: 700; margin-top: 8px; max-width: 240px;">
                    Amazing work! Earn <span style="color: #FDE047;">triple XP</span> for the next 10 minutes.
                  </div>
                </div>
                <button id="duoFinishFlow" class="gw-btn-press" style="width: 100%; height: 48px; border-radius: 16px; border: none; background: #FFFFFF; border-bottom: 4px solid #E2E8F0; color: #7D54E6; font-size: 14px; font-weight: 900; cursor: pointer;">
                  CONTINUE
                </button>
              </div>
            </div>
          `;
          if (c.soundEnabled !== false) snd.playMp3('/assets/duolingo/xp_boost_overlay_3x.mp3', 0.75);
          fireConfetti(['#FDE047', '#FFFFFF', '#A855F7']);
          mount.querySelector('#duoFinishFlow').onclick = () => {
            step = 1;
            renderView();
            ctx.emit('duolingo_flow_completed', { widgetId: widget.id });
          };
        }
      }

      mount.querySelectorAll('.duoStageBtn').forEach(b => {
        b.onclick = () => {
          step = Number(b.getAttribute('data-s'));
          streakIgnited = false;
          chestPhase = 'quest';
          renderView();
        };
      });
    }
    renderView();
  }

  // =========================================================================
  // 7. CRED OBSIDIAN SPIN WHEEL (Neo-Brutalist Dark Luxury)
  // =========================================================================
  function renderCredWheel(mount, widget, ctx) {
    const c = widget.config;
    const snd = ctx.sound;
    const segments = Array.isArray(c.segments) ? c.segments : [
      { label: '500 COINS', color: '#161821', text: '#FFFFFF' },
      { label: '₹100 CASH', color: '#E5B869', text: '#0C0D11' },
      { label: 'JACKPOT', color: '#00E599', text: '#0C0D11' },
      { label: '2X BOOSTER', color: '#1D212F', text: '#FFFFFF' },
      { label: 'MYSTERY', color: '#2B3144', text: '#E5B869' },
      { label: '5000 COINS', color: '#161821', text: '#FFFFFF' }
    ];
    let currentAngle = 0;
    let isSpinning = false;

    mount.innerHTML = `
      <div class="gw-phone-frame" style="background: ${c.bgTone || '#0C0D11'}; color: #FFF; padding: 24px 18px; justify-content: space-between; align-items: center;">
        <div style="font-family: monospace; font-size: 11px; background: #161821; border: 1px solid #262A3A; padding: 6px 14px; border-radius: 6px; color: #9CA3AF;">
          CRED COINS: <span style="color: ${c.goldTone || '#E5B869'}; font-weight: 800;">2,450,000</span>
        </div>

        <div style="position: relative; width: 236px; height: 236px;">
          <div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 20px solid ${c.accentGreen || '#00E599'}; z-index: 10;"></div>
          <canvas id="credWheelCv" width="236" height="236" style="border-radius: 50%; box-shadow: 0 0 0 6px #1D202D;"></canvas>
        </div>

        <button id="credSpinAction" class="gw-btn-press" style="width: 100%; height: 48px; border-radius: 8px; border: none; background: #FFFFFF; color: #0C0D11; font-weight: 900; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; cursor: pointer;">
          Spin to Win (${c.spinCostCoins || 1000} Coins)
        </button>
      </div>
    `;

    const cv = mount.querySelector('#credWheelCv');
    const cctx = cv.getContext('2d');
    function draw() {
      const n = segments.length;
      const arc = (Math.PI * 2) / n;
      cctx.clearRect(0, 0, 236, 236);
      segments.forEach((s, i) => {
        const a = currentAngle + i * arc;
        cctx.beginPath();
        cctx.moveTo(118, 118);
        cctx.arc(118, 118, 112, a, a + arc);
        cctx.closePath();
        cctx.fillStyle = s.color;
        cctx.fill();
        cctx.strokeStyle = '#282D3D';
        cctx.lineWidth = 2;
        cctx.stroke();

        cctx.save();
        cctx.translate(118, 118);
        cctx.rotate(a + arc / 2);
        cctx.fillStyle = s.text || '#FFF';
        cctx.font = 'bold 10px monospace';
        cctx.textAlign = 'right';
        cctx.fillText(s.label, 100, 4);
        cctx.restore();
      });
      cctx.beginPath();
      cctx.arc(118, 118, 24, 0, Math.PI * 2);
      cctx.fillStyle = '#0C0D11';
      cctx.fill();
      cctx.strokeStyle = c.goldTone || '#E5B869';
      cctx.lineWidth = 3.5;
      cctx.stroke();
    }
    draw();

    mount.querySelector('#credSpinAction').onclick = () => {
      if (isSpinning) return;
      isSpinning = true;
      const start = performance.now();
      const initAng = currentAngle;
      const delta = Math.PI * 2 * (5 + Math.random() * 3);
      let lastTick = 0;

      function anim(now) {
        const p = Math.min((now - start) / (c.decelerationDurationMs || 3800), 1);
        currentAngle = initAng + delta * (1 - Math.pow(1 - p, 4));
        draw();
        const t = Math.floor(currentAngle * 4);
        if (t !== lastTick) {
          lastTick = t;
          if (c.soundEnabled !== false) snd.playWheelTick();
        }
        if (p < 1) requestAnimationFrame(anim);
        else {
          isSpinning = false;
          if (c.soundEnabled !== false) snd.playRewardChime();
          fireConfetti([c.accentGreen || '#00E599', c.goldTone || '#E5B869', '#FFF']);
          ctx.emit('cred_wheel_spun', { widgetId: widget.id });
        }
      }
      requestAnimationFrame(anim);
    };
  }

  // =========================================================================
  // 8. TRIPLE PODIUM GAMIFIED LEADERBOARD (Region / National / Global)
  // =========================================================================
  function renderGamifyLeaderboard(mount, widget, ctx) {
    const c = widget.config;
    const snd = ctx.sound;
    let currentTab = c.activeTab || 'Region';
    const tabs = Array.isArray(c.tabs) ? c.tabs : ['Region', 'National', 'Global'];

    // Multipliers for tab datasets
    const tabMultipliers = {
      'Region': 1,
      'National': 1.65,
      'Global': 2.85
    };

    let topThree = JSON.parse(JSON.stringify(c.topThree || [
      { rank: 1, name: 'Eiden', username: '@username', score: 2430, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', color: '#F59E0B' },
      { rank: 2, name: 'Jackson', username: '@username', score: 1847, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', color: '#38BDF8' },
      { rank: 3, name: 'Emma Aria', username: '@username', score: 1674, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', color: '#22C55E' }
    ]));

    let listPlayers = JSON.parse(JSON.stringify(c.listPlayers || [
      { rank: 4, name: 'Sebastian', username: '@username', score: 1124, trend: 'up', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80' },
      { rank: 5, name: 'Jason', username: '@username', score: 875, trend: 'down', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
      { rank: 6, name: 'Natalie', username: '@username', score: 774, trend: 'up', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80' },
      { rank: 7, name: 'Serenity', username: '@username', score: 723, trend: 'up', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80' }
    ]));

    function getAdjustedScore(baseScore) {
      const mult = tabMultipliers[currentTab] || 1;
      return Math.round(baseScore * mult);
    }

    function renderView() {
      const rank1 = topThree.find(p => p.rank === 1) || topThree[0];
      const rank2 = topThree.find(p => p.rank === 2) || topThree[1];
      const rank3 = topThree.find(p => p.rank === 3) || topThree[2];

      const tabsHtml = tabs.map(tab => {
        const isActive = tab === currentTab;
        return `
          <div class="lb-tab-btn" data-tab="${tab}" style="flex: 1; text-align: center; padding: 8px 4px; cursor: pointer; position: relative;">
            <span style="font-size: 13.5px; font-weight: ${isActive ? '700' : '500'}; color: ${isActive ? '#FFFFFF' : '#8A99AD'}; transition: color 0.2s;">
              ${tab}
            </span>
            ${isActive ? `
              <div style="width: 32px; height: 3px; background: #38BDF8; border-radius: 2px; margin: 4px auto 0; box-shadow: 0 0 10px rgba(56, 189, 248, 0.7); animation: gwPopIn 0.2s ease;"></div>
            ` : '<div style="height: 3px; margin-top: 4px;"></div>'}
          </div>
        `;
      }).join('');

      const rowsHtml = listPlayers.map((player, idx) => {
        const score = getAdjustedScore(player.score);
        const isUp = player.trend === 'up';
        const isLast = idx === listPlayers.length - 1;
        return `
          <div class="lb-player-row gw-btn-press" data-name="${player.name}" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 4px; ${isLast ? '' : 'border-bottom: 1px solid rgba(255, 255, 255, 0.06);'} cursor: pointer; transition: background 0.15s;">
            <div style="display: flex; align-items: center; gap: 14px;">
              <img src="${player.avatar}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=1E293B&color=FFF';" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 1.5px solid rgba(255, 255, 255, 0.12);" alt="${player.name}" />
              <div>
                <div style="font-size: 14px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.2px;">${player.name}</div>
                <div style="font-size: 11px; color: #64748B; margin-top: 2px;">${player.username}</div>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 14.5px; font-weight: 800; color: #FFFFFF; font-variant-numeric: tabular-nums;">${score.toLocaleString()}</span>
              <span style="font-size: 9px; color: ${isUp ? '#22C55E' : '#EF4444'};">${isUp ? '▲' : '▼'}</span>
            </div>
          </div>
        `;
      }).join('');

      mount.innerHTML = `
        <div class="gw-phone-frame" style="background: #0E1322; padding: 0; display: flex; flex-direction: column; height: 680px; overflow-y: auto; overflow-x: hidden; scrollbar-width: none; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          
          <!-- Top iOS Status & App Header -->
          <div style="padding: 12px 18px 4px; display: flex; justify-content: space-between; align-items: center; color: #FFFFFF;">
            <!-- Back Arrow -->
            <button id="lbBackBtn" class="gw-btn-press" style="width: 32px; height: 32px; border-radius: 50%; background: transparent; border: none; color: #4A9DFF; font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
              <i class="fa-solid fa-chevron-left"></i>
            </button>

            <!-- Title -->
            <div style="font-size: 17px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.2px;">${c.title || 'Leaderboard'}</div>

            <!-- 4-Dot Menu Icon -->
            <div style="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; color: #4A9DFF; cursor: pointer;">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="4" cy="4" r="2.2" />
                <circle cx="12" cy="4" r="2.2" />
                <circle cx="4" cy="12" r="2.2" />
                <circle cx="12" cy="12" r="2.2" />
              </svg>
            </div>
          </div>

          <!-- Segmented Tab Bar (Region / National / Global) -->
          <div style="margin: 12px 18px 16px; background: #161D32; border-radius: 14px; padding: 3px 6px; display: flex; border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 4px 14px rgba(0,0,0,0.2);">
            ${tabsHtml}
          </div>

          <!-- Triple Podium Section (Rank 2 | Rank 1 | Rank 3) -->
          <div style="padding: 0 14px; display: flex; align-items: flex-end; justify-content: center; gap: 8px; margin-top: 10px;">
            
            <!-- RANK 2: Jackson (Left) -->
            <div class="lb-podium-col gw-btn-press" data-name="${rank2.name}" style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
              <div style="position: relative; margin-bottom: -10px; z-index: 2;">
                <img src="${rank2.avatar}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(rank2.name)}&background=0284C7&color=FFF';" style="width: 66px; height: 66px; border-radius: 50%; object-fit: cover; border: 3px solid #38BDF8; box-shadow: 0 0 16px rgba(56, 189, 248, 0.45);" alt="${rank2.name}" />
                <div style="position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%) rotate(45deg); width: 22px; height: 22px; background: #0284C7; border: 1.5px solid #38BDF8; border-radius: 5px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
                  <span style="transform: rotate(-45deg); font-size: 11px; font-weight: 900; color: #FFFFFF;">2</span>
                </div>
              </div>
              <div style="width: 100%; height: 138px; background: #18223C; border-radius: 18px 18px 0 0; padding: 20px 6px 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; border-top: 1px solid rgba(56, 189, 248, 0.2);">
                <div style="font-size: 13.5px; font-weight: 700; color: #FFFFFF; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 84px;">${rank2.name}</div>
                <div style="font-size: 16px; font-weight: 800; color: #38BDF8; margin: 4px 0 2px; font-variant-numeric: tabular-nums;">${getAdjustedScore(rank2.score).toLocaleString()}</div>
                <div style="font-size: 10.5px; color: #64748B;">${rank2.username}</div>
              </div>
            </div>

            <!-- RANK 1: Eiden (Center - Tallest & Crowned) -->
            <div class="lb-podium-col gw-btn-press" data-name="${rank1.name}" style="flex: 1.15; display: flex; flex-direction: column; align-items: center; cursor: pointer; z-index: 5;">
              <!-- 5-Point Golden Crown -->
              <div style="margin-bottom: -4px; animation: gwFloatCoin 3s ease-in-out infinite;">
                <svg width="34" height="26" viewBox="0 0 24 20" fill="none">
                  <path d="M2 17L4 6L8.5 11L12 3L15.5 11L20 6L22 17H2Z" fill="url(#crownGrad)" stroke="#FDE68A" stroke-width="1.2" stroke-linejoin="round" />
                  <circle cx="12" cy="3" r="1.5" fill="#FFF" />
                  <circle cx="4" cy="6" r="1.2" fill="#FFF" />
                  <circle cx="20" cy="6" r="1.2" fill="#FFF" />
                  <defs>
                    <linearGradient id="crownGrad" x1="2" y1="3" x2="22" y2="17" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#FDE047" />
                      <stop offset="0.6" stop-color="#F59E0B" />
                      <stop offset="1" stop-color="#B45309" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div style="position: relative; margin-bottom: -12px; z-index: 2;">
                <img src="${rank1.avatar}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(rank1.name)}&background=D97706&color=FFF';" style="width: 82px; height: 82px; border-radius: 50%; object-fit: cover; border: 3.5px solid #F59E0B; box-shadow: 0 0 24px rgba(245, 158, 11, 0.55);" alt="${rank1.name}" />
                <div style="position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%) rotate(45deg); width: 24px; height: 24px; background: #D97706; border: 1.5px solid #FDE68A; border-radius: 5px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.4);">
                  <span style="transform: rotate(-45deg); font-size: 12px; font-weight: 900; color: #FFFFFF;">1</span>
                </div>
              </div>

              <div style="width: 100%; height: 172px; background: #1D2847; border-radius: 20px 20px 0 0; padding: 24px 8px 14px; display: flex; flex-direction: column; align-items: center; justify-content: center; border-top: 1px solid rgba(245, 158, 11, 0.35); box-shadow: 0 -8px 24px rgba(0,0,0,0.3);">
                <div style="font-size: 15px; font-weight: 800; color: #FFFFFF; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 96px;">${rank1.name}</div>
                <div style="font-size: 19px; font-weight: 900; color: #F59E0B; margin: 4px 0 2px; font-variant-numeric: tabular-nums;">${getAdjustedScore(rank1.score).toLocaleString()}</div>
                <div style="font-size: 11px; color: #64748B;">${rank1.username}</div>
              </div>
            </div>

            <!-- RANK 3: Emma Aria (Right) -->
            <div class="lb-podium-col gw-btn-press" data-name="${rank3.name}" style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
              <div style="position: relative; margin-bottom: -10px; z-index: 2;">
                <img src="${rank3.avatar}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(rank3.name)}&background=16A34A&color=FFF';" style="width: 66px; height: 66px; border-radius: 50%; object-fit: cover; border: 3px solid #22C55E; box-shadow: 0 0 16px rgba(34, 197, 94, 0.45);" alt="${rank3.name}" />
                <div style="position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%) rotate(45deg); width: 22px; height: 22px; background: #16A34A; border: 1.5px solid #86EFAC; border-radius: 5px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
                  <span style="transform: rotate(-45deg); font-size: 11px; font-weight: 900; color: #FFFFFF;">3</span>
                </div>
              </div>
              <div style="width: 100%; height: 126px; background: #18223C; border-radius: 18px 18px 0 0; padding: 20px 6px 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; border-top: 1px solid rgba(34, 197, 94, 0.2);">
                <div style="font-size: 13.5px; font-weight: 700; color: #FFFFFF; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 84px;">${rank3.name}</div>
                <div style="font-size: 16px; font-weight: 800; color: #22C55E; margin: 4px 0 2px; font-variant-numeric: tabular-nums;">${getAdjustedScore(rank3.score).toLocaleString()}</div>
                <div style="font-size: 10.5px; color: #64748B;">${rank3.username}</div>
              </div>
            </div>

          </div>

          <!-- Bottom Sheet (Ranks 4+) -->
          <div style="background: #141A2D; border-radius: 26px 26px 0 0; padding: 16px 18px 24px; box-shadow: 0 -10px 30px rgba(0,0,0,0.4); flex: 1; border-top: 1px solid rgba(255, 255, 255, 0.06);">
            ${rowsHtml}
          </div>

        </div>
      `;

      // Event handlers for tab clicks
      mount.querySelectorAll('.lb-tab-btn').forEach(btn => {
        btn.onclick = () => {
          const tab = btn.getAttribute('data-tab');
          if (tab === currentTab) return;
          currentTab = tab;
          if (c.soundEnabled !== false) snd.playToastPop();
          renderView();
          ctx.emit('leaderboard_tab_switched', { widgetId: widget.id, tab });
        };
      });

      // Event handlers for player row click
      mount.querySelectorAll('.lb-player-row, .lb-podium-col').forEach(row => {
        row.onclick = () => {
          const name = row.getAttribute('data-name');
          if (c.soundEnabled !== false) snd.playRewardChime();
          fireConfetti(['#38BDF8', '#F59E0B', '#22C55E']);
          ctx.emit('leaderboard_player_inspected', { widgetId: widget.id, name });
        };
      });

      const backBtn = mount.querySelector('#lbBackBtn');
      if (backBtn) {
        backBtn.onclick = () => {
          if (c.soundEnabled !== false) snd.playToastPop();
          ctx.emit('leaderboard_back_pressed', { widgetId: widget.id });
        };
      }
    }

    renderView();
  }

  // Public API
  window.GamifyWidgets = {
    render(mountEl, widget, opts = {}) {
      injectSharedStyles();
      const sound = opts.sound || new window.GamifySoundEngine(opts.baseUrl || '');
      const emit = opts.onEvent || (() => {});
      const ctx = { sound, emit };

      switch (widget.type) {
        case 'zepto_scratch': return renderZeptoScratch(mountEl, widget, ctx);
        case 'mynaksh_checkin': return renderMynakshCheckin(mountEl, widget, ctx);
        case 'instaastro_points': return renderInstaAstroPoints(mountEl, widget, ctx);
        case 'paytm_chest_scratch': return renderPaytmChestScratch(mountEl, widget, ctx);
        case 'paytm_spin_win': return renderPaytmSpinWin(mountEl, widget, ctx);
        case 'duolingo_flow': return renderDuolingoFlow(mountEl, widget, ctx);
        case 'cred_wheel': return renderCredWheel(mountEl, widget, ctx);
        case 'gamify_leaderboard': return renderGamifyLeaderboard(mountEl, widget, ctx);
        default:
          mountEl.innerHTML = `<div style="color:#94A3B8;">Unknown widget type: ${widget.type}</div>`;
      }
    }
  };
})(window, document);

