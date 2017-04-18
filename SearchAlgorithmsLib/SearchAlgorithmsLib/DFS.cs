﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MazeLib;

namespace SearchAlgorithmsLib
{

    public class DFS<T> : StackSearcher<T>
    {
        public override Solution<T> search(ISearchable<T> searchable, Comparator<T> comparator = null)
        {
            HashSet<T> labeled = new HashSet<T>();
            State<T> state = searchable.getInitializeState();
            state.cost = 1;
            state.cameFrom = null;
            addToOpenList(state);
            while (openListSize > 0)
            {
                state = popOpenList();
                if (state.Equals(searchable.getGoalState()))
                {
                    return backTrace(ref state);
                }
                if (!labeled.Contains(state.getstate()))
                {
                    labeled.Add(state.getstate());
                    List<State<T>> succerssors = searchable.getAllPossibleStates(state);
                    foreach (State<T> s in succerssors)
                    {
                        if (!labeled.Contains(s.getstate()))
                        {
                            s.cost = state.cost + 1;
                            s.cameFrom = state;
                            addToOpenList(s);
                        }
                    }

                }
            }
            return null;
        }
    }
}
