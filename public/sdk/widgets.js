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
  // 2. MYNAKSH DAILY CHECK-IN & CELEBRATION (ScreenRecording_11-05-2026 11-20-22_1.mp4)
  // =========================================================================
  function renderMynakshCheckin(mount, widget, ctx) {
    const c = widget.config;
    const snd = ctx.sound;
    const cur = c.currencySymbol || '₹';
    const rewards = Array.isArray(c.dayRewards) ? c.dayRewards : [5, 7, 9, 11, 13, 15, 17];
    const activeDay = Math.min(Math.max(1, Number(c.activeDay || 1)), 7);
    let viewState = c.initialView || 'modal'; // 'modal' | 'celebrate' | 'rewards_hub'

    function renderView() {
      if (viewState === 'modal') {
        const makeDayBox = (idx) => {
          const dayNum = idx + 1;
          const isDone = dayNum < activeDay;
          const isToday = dayNum === activeDay;
          const amt = rewards[idx] ?? 5;
          const border = isToday ? `2px solid ${c.highlightColor || '#F59E0B'}` : '1px solid #EAE5DC';
          const bg = isToday ? '#FFF9EC' : '#F8F6F2';
          const coinBg = isToday
            ? 'linear-gradient(135deg, #FBBF24, #D97706)'
            : isDone
            ? '#10B981'
            : '#CBD5E1';
          const coinSym = isDone ? '✓' : '+';
          return `
            <div style="background: ${bg}; border: ${border}; border-radius: 14px; padding: 10px 6px; display: flex; flex-direction: column; align-items: center; gap: 6px;">
              <span style="font-size: 11px; color: #64748B; font-weight: 600;">Day ${dayNum}</span>
              <span style="font-size: 14px; font-weight: 800; color: #1E293B;">${cur}${amt}</span>
              <div style="width: 24px; height: 24px; border-radius: 50%; background: ${coinBg}; color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 900; box-shadow: 0 2px 6px rgba(0,0,0,0.12);">${coinSym}</div>
            </div>
          `;
        };

        mount.innerHTML = `
          <div class="gw-phone-frame" style="background: #EFE9DF; justify-content: flex-end;">
            <button class="gw-replay-chip" id="mnSwitchHub">Hub View</button>
            <!-- Dimmed app background -->
            <div style="padding: 18px 18px 0; opacity: 0.45;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                <span style="font-size: 15px; font-weight: 800; color: #1E1B18;">Namaste Ankush</span>
                <span style="background: #1C1917; color: #FFF; padding: 4px 10px; border-radius: 14px; font-size: 11px; font-weight: 700;">Wallet ${cur}20 +</span>
              </div>
              <div style="height: 60px; background: #141210; border-radius: 14px;"></div>
            </div>

            <!-- White Rounded Bottom Sheet -->
            <div style="background: #FFFFFF; border-radius: 26px 26px 0 0; padding: 20px 18px 22px; box-shadow: 0 -10px 40px rgba(0,0,0,0.18);">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #FCD34D, #D97706); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.35);">
                  <span style="font-size: 18px; color: #FFF; font-weight: 900;">${cur}</span>
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
              <div style="display: grid; grid-template-columns: repeat(3, 72px); justify-content: center; gap: 8px; margin-bottom: 18px;">
                ${[4, 5, 6].map(makeDayBox).join('')}
              </div>

              <button id="mnClaimBtn" class="gw-btn-press" style="width: 100%; height: 48px; border-radius: 24px; border: none; background: ${c.ctaColor || '#0E6B38'}; color: #FFFFFF; font-size: 14px; font-weight: 800; cursor: pointer; box-shadow: 0 6px 18px rgba(14, 107, 56, 0.35);">
                ${c.ctaText || "Claim Today's Reward"}
              </button>
            </div>
          </div>
        `;

        mount.querySelector('#mnClaimBtn').onclick = () => {
          if (c.soundEnabled !== false) snd.playCoinCascade(6);
          viewState = 'celebrate';
          renderView();
          fireConfetti(['#FBBF24', '#0E6B38', '#FFFFFF']);
          ctx.emit('mynaksh_streak_claimed', { widgetId: widget.id, day: activeDay, amount: rewards[activeDay - 1] });
        };
        mount.querySelector('#mnSwitchHub').onclick = () => { viewState = 'rewards_hub'; renderView(); };

      } else if (viewState === 'celebrate') {
        const earned = rewards[activeDay - 1] ?? 5;
        mount.innerHTML = `
          <div class="gw-phone-frame" style="background: rgba(15, 14, 12, 0.94); justify-content: center; align-items: center; padding: 24px; text-align: center;">
            <button id="mnCloseCel" style="position: absolute; top: 18px; right: 18px; width: 30px; height: 30px; border-radius: 50%; background: rgba(255,255,255,0.16); border: none; color: #FFF; font-size: 16px; cursor: pointer;">&times;</button>

            <div style="position: relative; width: 150px; height: 150px; margin-bottom: 16px;">
              <!-- Rotating Golden Sunburst -->
              <div style="position: absolute; top: 50%; left: 50%; width: 220px; height: 220px; border-radius: 50%; background: repeating-conic-gradient(from 0deg, rgba(251, 191, 36, 0.28) 0deg 12deg, transparent 12deg 24deg); -webkit-mask-image: radial-gradient(circle, black 30%, transparent 72%); animation: gwSunburstSpin 14s linear infinite;"></div>
              <!-- Floating 3D Gold Coin -->
              <div style="position: relative; z-index: 2; width: 112px; height: 112px; margin: 19px auto; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #FEF08A, #F59E0B 60%, #B45309 100%); border: 5px solid #FDE68A; box-shadow: 0 12px 35px rgba(245, 158, 11, 0.65); display: flex; align-items: center; justify-content: center; animation: gwFloatCoin 2.4s ease-in-out infinite;">
                <span style="font-size: 54px; font-weight: 900; color: #92400E; text-shadow: 0 2px 0 rgba(255,255,255,0.5);">${cur}</span>
              </div>
            </div>

            <div style="font-size: 22px; font-weight: 900; color: #FFFFFF; margin-bottom: 4px; animation: gwPopIn 0.35s ease;">
              ${activeDay} Day Streak!
            </div>
            <div style="font-size: 16px; font-weight: 800; color: #FACC15; margin-bottom: 8px;">
              You earned ${cur}${earned} today
            </div>
            <div style="font-size: 12px; color: #CBD5E1; max-width: 240px; line-height: 1.4; margin-bottom: 24px;">
              Collect your daily reward and keep your streak going.
            </div>

            <button id="mnOkBtn" class="gw-btn-press" style="width: 140px; height: 42px; border-radius: 21px; border: none; background: rgba(255, 255, 255, 0.22); color: #FFFFFF; font-size: 14px; font-weight: 800; cursor: pointer;">
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

      } else {
        // Dark Rewards Hub ("Keep Your Streak Alive!")
        const nextAmt = rewards[Math.min(activeDay, 6)] ?? 7;
        const pills = rewards.map((amt, idx) => {
          const d = idx + 1;
          const claimed = d <= activeDay;
          return `
            <div style="flex: 1; background: #1F2127; border: ${claimed ? '1.5px solid #10B981' : '1px solid #2E313B'}; border-radius: 10px; padding: 8px 2px; display: flex; flex-direction: column; align-items: center; gap: 4px;">
              <span style="font-size: 9px; color: #9CA3AF; font-weight: 700;">Day ${d}</span>
              <span style="font-size: 11px; font-weight: 800; color: #FFF;">${cur}${amt}</span>
              <div style="width: 18px; height: 18px; border-radius: 50%; background: ${claimed ? '#10B981' : '#3F4451'}; color: #FFF; font-size: 10px; display: flex; align-items: center; justify-content: center; font-weight: 900;">${claimed ? '✓' : '+'}</div>
            </div>
          `;
        }).join('');

        mount.innerHTML = `
          <div class="gw-phone-frame" style="background: #F6F3EE; padding: 16px; gap: 14px;">
            <button class="gw-replay-chip" id="mnBackModal"><i class="fa-solid fa-rotate-left"></i> Replay Popup</button>

            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 18px; font-weight: 900; color: #111827;">Rewards</span>
              <span style="background: #FFFFFF; border: 1px solid #E5E7EB; padding: 4px 10px; border-radius: 16px; font-size: 11px; font-weight: 800; color: #111827;">Wallet ${cur}${20 + (rewards[activeDay - 1] || 5)} +</span>
            </div>

            <!-- Keep Your Streak Alive Dark Banner -->
            <div style="background: #141518; border-radius: 18px; padding: 14px; color: #FFF;">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                <div style="width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, #FCD34D, #D97706); display: flex; align-items: center; justify-content: center; font-weight: 900; color: #78350F;">${cur}</div>
                <div>
                  <div style="font-size: 14px; font-weight: 800;">Keep Your Streak Alive!</div>
                  <div style="font-size: 10px; color: #9CA3AF;">Collect your daily rewards here</div>
                </div>
              </div>
              <div style="display: flex; gap: 4px; margin-bottom: 10px;">${pills}</div>
              <div style="background: #1F2229; border-radius: 10px; padding: 8px; text-align: center; font-size: 11px; font-weight: 700; color: #E5E7EB;">
                ✨ Get ${cur}${nextAmt} more tomorrow
              </div>
            </div>

            <!-- Refer Card -->
            <div style="background: #FFFBF2; border: 1px solid #F3E8D2; border-radius: 18px; padding: 14px;">
              <div style="font-size: 14px; font-weight: 800; color: #1F2937;">Refer a friend &amp; both earn ${cur}50</div>
              <div style="font-size: 11px; color: #0E6B38; margin: 4px 0 10px; font-weight: 600;">How referral works &rsaquo;</div>
              <button class="gw-btn-press" style="width: 100%; height: 38px; border-radius: 19px; border: none; background: ${c.ctaColor || '#0E6B38'}; color: #FFF; font-size: 12px; font-weight: 800; cursor: pointer;">
                Refer a friend
              </button>
              <div style="text-align: center; font-size: 11px; color: #6B7280; margin-top: 8px;">Referral Code: <b style="color:#111827;">R8HKBD</b></div>
            </div>

            <!-- Mantra Jaap Card -->
            <div style="background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 16px; padding: 12px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 12px; font-weight: 800; color: #111827;">Mars Mantra</div>
                <div style="font-size: 10px; color: #6B7280;">Om Am Angarakaya Namah</div>
              </div>
              <span style="background: #FEF3C7; color: #B45309; font-size: 11px; font-weight: 800; padding: 6px 10px; border-radius: 14px;">Claim ${cur}1 &rsaquo;</span>
            </div>
          </div>
        `;
        mount.querySelector('#mnBackModal').onclick = () => { viewState = 'modal'; renderView(); };
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
        default:
          mountEl.innerHTML = `<div style="color:#94A3B8;">Unknown widget type: ${widget.type}</div>`;
      }
    }
  };
})(window, document);

