$.extend({
	parseCSV: function(opt) {
		if (opt.sepChar == null) opt.sepChar = "\t";
		if (opt.header == null) opt.header = true;
		if (opt.trim == null) opt.trim = true;
		if (opt.map == null) opt.map = false;
		if (opt.numberize == null) opt.numberize = true;

		var i,j,res = { rows: [] };
		var rows = opt.csv.split("\n");
		if (opt.header) res.header = rows[0].split(opt.sepChar);
		rows = rows.slice(1);
		for (i in rows) {
			res.rows.push(rows[i].split(opt.sepChar));
		}
		// clear whitespaces
		if (opt.trim) {
			for (i in res.header) {
				res.header[i] = res.header[i].trim();
			}
			for (i in res.rows) {
				for (j in res.rows[i]) {
					res.rows[i][j] = res.rows[i][j].trim();
				}
			}
		}
		// convert to numbers
		if (opt.numberize) {
			for (i in res.header) {
				if (res.header[i] == Number(res.header[i])) 
					res.header[i] = Number(res.header[i]);
			}
			for (i in res.rows) {
				for (j in res.rows[i]) {
					if (res.rows[i][j] == Number(res.rows[i][j]))
						res.rows[i][j] = Number(res.rows[i][j]);
				}
			}
		}
		// store rows as dictionaries
		if (opt.map) {
			for (i in res.rows) {
				var altrow = {};
				for (j in res.rows[i]) {
					altrow[res.header[j]] = res.rows[i][j];
				}
				res.rows[i] = altrow;
			}
		}
		return res;
	}
});