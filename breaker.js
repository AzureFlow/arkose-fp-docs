// https://client-api.arkoselabs.com/dapib/eu-west-1/6cadf6b9-95fd-4fb0-8ba6-b960e56107c9/1847.js

(function () {
	function sendResult(tanswer) {
		console.log("Sending result:", tanswer);
		window.parent.ae.dapibReceive({tanswer: tanswer});
	}

	function F(answers) {
		let b = answers;
		b = b.map((L) => {
			const f = L;
			Object.keys(L).forEach((h) => {
				const m = L[h];
				const w = m.split("");
				f[h] = w.reverse().join("");
			});
			return f;
		});

		b = b.map((L) => {
			const f = L;
			Object.keys(L).forEach((h) => {
				const m = L[h];
				const w = m.split("");
				f[h] = w.reverse().join("");
			});
			return f;
		});

		b = b.map((L) => {
			const f = L;
			Object.keys(L).forEach((h) => {
				const w = L[h];
				const O = w.split("");
				const i = (P, E) => {
					if (E.match(/[0-9]/)) {
						return P + String.fromCharCode(+E + 33);
					}

					if (E.match(/[a-zA-Z]/)) {
						const t = E.charCodeAt(0);
						return P + t.toString();
					}

					return P + E;
				};

				f[h] = O.reduce(i, "");
			});
			return f;
		});

		b = b.map((L) => {
			const f = L;
			Object.keys(L).forEach((h) => {
				const m = L[h];
				let w = m.replace(/[^a-zA-Z0-9_$]/g, "");
				if (!/^[a-zA-Z_$]/.test(w)) {
					w = "_" + w;
				}

				f[w] = h;
			});

			return f;
		});

		return b;
	}

	function u(inputAnswer, L) {
		// Unused
		// const f = g(this, function () {
		// 	return f.toString().search("(((.+)+)+)+$").toString().constructor(f).search("(((.+)+)+)+$");
		// });
		// f();

		const h = inputAnswer.map((w) => {
			const O = w;
			Object.keys(w).forEach((i) => {
				const S = w[i].toString();
				O[i] = w[i].toString();
			});
			return O;
		});

		// let m = H.TBkgh(F, h);
		let m = F(h);
		m = m.map((answer) => {
			const ianswer = answer;
			Object.keys(answer).forEach((w) => {
				let O = ianswer[w];
				O = O + (L ? L : "");
				ianswer[w] = O;
			});

			return ianswer;
		});

		return sendResult(m);
	}

	const g = (function () {
		let b = true;
		return function (L, f) {
			const h = b
				? function () {
						if (f) {
							const m = f.apply(L, arguments);
							f = null;
							return m;
						}
					}
				: function () {};
			b = false;
			return h;
		};
	})();

	try {
		let x = undefined;
		if (Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]" || (window.document.hidden && window.document.visibilityState === "prerender" && typeof window.requestAnimationFrame === "undefined" && typeof window.cancelAnimationFrame === "undefined") || !(window.document.activeElement instanceof Object)) {
			console.log("DOING WEIRD RANDOM (detected sandbox?)", [Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]", window.document.hidden, window.document.visibilityState === "prerender", typeof window.requestAnimationFrame === "undefined", typeof window.cancelAnimationFrame === "undefined", !(window.document.activeElement instanceof Object)]);
			x = String.fromCharCode(Math.random() * 26 + 65);
		}

		console.log("mess up?:", x);
		const answer = window.parent.ae.answer;
		u(answer, x);
	} catch (err) {
		console.error(err);
		sendResult(err);
	}
})();
