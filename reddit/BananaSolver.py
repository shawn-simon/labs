
#Shawn Simon
#trisma@gmail.com

class BananaSolver:
	
	def __init__(self):
		self.panels = [] # Integer list, panel stored cash
		self.R = 0 # Panel replacement cost, integer
		self.workers = [] # People who remove the panels, list of tuples 
		self.max_days = 0
		# (embezzlement factor, panel removal per day)
		# assumption, workers are sorted by descending embezzlment factor

	def load_panels_from_file(self, filename):
		self.panels = []
		with open(filename) as f:
			for i, line in enumerate(f):
				if i == 0:
					self.R = int(line)
				else:
					self.panels.append(int(line))

	def solve(self):
		max_removable_panels = self.get_max_removable_panels()
		print('Max removable panels')
		print max_removable_panels

		value = BananaSolver.calculate_panel_set_value(self.panels, self.workers, self.R, self.max_days)
		return value		

	def get_max_removable_panels(self):
		""" Returns the maximum number of panels that are removable."""
		max_removable_panels = 0
		for worker in self.workers:
			yield_factor, panels_per_day = worker
			max_removable_panels += panels_per_day * self.max_days;
		# Note: this could be greater than the maximum number of panels.
		total_remaining = BananaSolver.calculate_panel_set_value(self.panels)

		print "total remaining"
		print total_remaining
		
		return [("test:", max_removable_panels)]

	@staticmethod
	def calculate_panel_set_value(panels, workers=None, R=0, max_days=0):
		"""Calculates the maximum value of a set of panels. This is a subset of the entire banana stand.
	     Sort the panels, for now. Might be better to sort the entire list in the future, or try a different approach entirely."""
		set_value = 0
		if workers == None:
			set_value = sum(panels)
		else:
			sorted_panels = sorted(panels) 
			for worker in workers:
				yield_factor, panels_per_day = worker
				for max_panels_per_worker in range(panels_per_day * max_days):
					set_value += yield_factor * panels.pop() - R
		return set_value
		

solver = BananaSolver()
solver.workers = [(1, 1), (.95, 2), (.85, 3), (.6, 4)]
solver.max_days = 7

solver.load_panels_from_file('sample.txt')

print 'Max Days'
print solver.max_days

print 'R'
print solver.R

print 'Panel list'
print solver.panels

print 'Panel count'
print str(len(solver.panels))

solution = solver.solve()

print 'Solution'
print(solution)